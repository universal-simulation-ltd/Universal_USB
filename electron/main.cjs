const { app, BrowserWindow, ipcMain, shell, powerMonitor } = require('electron')
const path = require('node:path')
const { execFile } = require('node:child_process')

// Set by `npm run electron:dev` to load the live Vite dev server. When unset
// (the packaged app), we load the built bundle from disk over `file://`.
const DEV_SERVER_URL = process.env.ELECTRON_START_URL

// node-usb is a native module (libusb). It lives here in the main process only
// — the renderer stays fully sandboxed and receives plain device snapshots over
// IPC. Loading can fail if the native binding is missing/ABI-mismatched (run
// `npm run rebuild`) or if libusb has no backend on this OS; capture that so the
// UI can show a clear message instead of a blank screen.
let usb = null
let usbLoadError = null
try {
  usb = require('usb').usb
} catch (err) {
  usbLoadError = err && err.message ? err.message : String(err)
  console.error('Failed to load node-usb:', usbLoadError)
}

let mainWindow = null

// ---------------------------------------------------------------------------
// USB descriptor decoding
// ---------------------------------------------------------------------------

// bcdUSB is a binary-coded-decimal version (0x0210 => "2.1"). Map the ones we
// care about to a friendly label + the marketing generation.
function decodeUsbVersion(bcdUSB) {
  const map = {
    0x0100: { label: 'USB 1.0', generation: 'USB 1' },
    0x0110: { label: 'USB 1.1', generation: 'USB 1' },
    0x0200: { label: 'USB 2.0', generation: 'USB 2' },
    0x0210: { label: 'USB 2.1', generation: 'USB 2' },
    0x0300: { label: 'USB 3.0', generation: 'USB 3' },
    0x0310: { label: 'USB 3.1', generation: 'USB 3' },
    0x0320: { label: 'USB 3.2', generation: 'USB 3' }
  }
  if (map[bcdUSB]) return map[bcdUSB]
  const major = (bcdUSB >> 8) & 0xff
  const minor = (bcdUSB >> 4) & 0x0f
  return { label: `USB ${major}.${minor}`, generation: `USB ${major}` }
}

// libusb reports the negotiated link speed as an enum. On Windows this is
// frequently LIBUSB_SPEED_UNKNOWN (0) because the backend can't read it without
// opening the device — in that case we fall back to the theoretical maximum
// implied by the descriptor's USB version, flagged `estimated` so the UI can
// say "up to" rather than pretending it measured the live rate.
function decodeSpeed(speed, bcdUSB) {
  switch (speed) {
    case 1:
      return { label: 'Low Speed', rate: '1.5 Mbps', estimated: false }
    case 2:
      return { label: 'Full Speed', rate: '12 Mbps', estimated: false }
    case 3:
      return { label: 'High Speed', rate: '480 Mbps', estimated: false }
    case 4:
      return { label: 'SuperSpeed', rate: '5 Gbps', estimated: false }
    case 5:
      return { label: 'SuperSpeed+', rate: '10 Gbps', estimated: false }
    default: {
      // Unknown live speed — estimate the ceiling from the USB version.
      if (bcdUSB >= 0x0320) return { label: 'up to SuperSpeed+', rate: '20 Gbps', estimated: true }
      if (bcdUSB >= 0x0310) return { label: 'up to SuperSpeed+', rate: '10 Gbps', estimated: true }
      if (bcdUSB >= 0x0300) return { label: 'up to SuperSpeed', rate: '5 Gbps', estimated: true }
      if (bcdUSB >= 0x0200) return { label: 'up to High Speed', rate: '480 Mbps', estimated: true }
      if (bcdUSB >= 0x0110) return { label: 'up to Full Speed', rate: '12 Mbps', estimated: true }
      return { label: 'Unknown', rate: null, estimated: true }
    }
  }
}

// USB base-class codes -> a role label a non-engineer understands. Class is
// often declared per-interface (device bDeviceClass = 0), so we read the
// interface descriptors and collect the distinct roles.
const CLASS_NAMES = {
  0x01: 'Audio',
  0x02: 'Communications',
  0x03: 'Keyboard / mouse / HID',
  0x05: 'Physical',
  0x06: 'Camera / imaging',
  0x07: 'Printer',
  0x08: 'Storage (flash / disk)',
  0x09: 'USB hub',
  0x0a: 'Data',
  0x0b: 'Smart card',
  0x0d: 'Content security',
  0x0e: 'Video / webcam',
  0x0f: 'Health',
  0xdc: 'Diagnostic',
  0xe0: 'Wireless (Bluetooth etc.)',
  0xef: 'Miscellaneous',
  0xfe: 'Application specific',
  0xff: 'Vendor specific'
}

function classLabel(code) {
  return CLASS_NAMES[code] || `Class 0x${code.toString(16).padStart(2, '0')}`
}

function hex4(n) {
  return '0x' + (n >>> 0).toString(16).padStart(4, '0')
}

// Read a string descriptor (manufacturer / product / serial). Requires opening
// the device, which on Windows can fail for devices bound to their class driver
// rather than WinUSB — treat any failure as "unknown" and move on.
function readString(device, index) {
  return new Promise((resolve) => {
    if (!index) return resolve(null)
    try {
      device.getStringDescriptor(index, (err, value) => {
        resolve(err ? null : value || null)
      })
    } catch {
      resolve(null)
    }
  })
}

async function snapshotDevice(device) {
  const d = device.deviceDescriptor
  const version = decodeUsbVersion(d.bcdUSB)
  const speed = decodeSpeed(device.speed, d.bcdUSB)

  // bMaxPower is the current the device REQUESTS in its config descriptor.
  // Units are 2 mA for USB 2.x configs and 8 mA for SuperSpeed (USB 3+) ones.
  // This is not USB-C Power Delivery negotiation — see the PD note in the UI.
  let requestedMa = null
  let roles = []
  const cfg = device.configDescriptor
  if (cfg) {
    const unit = d.bcdUSB >= 0x0300 ? 8 : 2
    requestedMa = cfg.bMaxPower * unit
    if (Array.isArray(cfg.interfaces)) {
      const codes = new Set()
      for (const alts of cfg.interfaces) {
        for (const iface of alts) codes.add(iface.bInterfaceClass)
      }
      roles = [...codes].map(classLabel)
    }
  }
  // Fall back to the device-level class if no interface classes were found.
  if (roles.length === 0 && d.bDeviceClass) roles = [classLabel(d.bDeviceClass)]

  // String descriptors need the device open; best-effort, non-fatal.
  let manufacturer = null
  let product = null
  let serialNumber = null
  try {
    device.open()
    manufacturer = await readString(device, d.iManufacturer)
    product = await readString(device, d.iProduct)
    serialNumber = await readString(device, d.iSerialNumber)
  } catch {
    // Opening not permitted (typical on Windows for class-driver devices).
  } finally {
    try {
      device.close()
    } catch {
      /* already closed */
    }
  }

  const isHub = d.bDeviceClass === 0x09 || roles.includes('USB hub')
  // Flash drives / external disks are the thing people most often plug in to
  // "check" — always surface them in the main area, even if they were already
  // connected at launch. Mass storage usually declares its class per-interface.
  const isStorage = d.bDeviceClass === 0x08 || roles.includes('Storage (flash / disk)')
  const portPath = Array.isArray(device.portNumbers) ? device.portNumbers.join('.') : null

  return {
    id: `${device.busNumber}-${device.deviceAddress}`,
    // Stable identity across re-scans and unplug/replug: same physical device on
    // the same physical port. Used for the "new since launch" split and for the
    // renderer's persisted manual-hide list. Doesn't depend on opening the
    // device (serial is unavailable in attach/detach events).
    key: deviceKey(d.idVendor, d.idProduct, device.portNumbers),
    vendorId: hex4(d.idVendor),
    productId: hex4(d.idProduct),
    manufacturer,
    product,
    serialNumber,
    usbVersion: version.label,
    generation: version.generation,
    speedLabel: speed.label,
    speedRate: speed.rate,
    speedEstimated: speed.estimated,
    roles,
    isHub,
    isStorage,
    // Everything we can see has enumerated, so its data lines are working — a
    // charge-only cable would never produce a device at all.
    dataCapable: true,
    requestedMa,
    requestedWatts: requestedMa != null ? +((requestedMa * 5) / 1000).toFixed(2) : null,
    busNumber: device.busNumber,
    deviceAddress: device.deviceAddress,
    portPath
  }
}

// Identity independent of open()/serial so it matches in attach/detach events.
function deviceKey(idVendor, idProduct, portNumbers) {
  const port = Array.isArray(portNumbers) ? portNumbers.join('.') : 'x'
  return `${hex4(idVendor)}:${hex4(idProduct)}@${port}`
}

async function enumerate() {
  if (!usb) return { error: usbLoadError || 'USB backend unavailable', devices: [] }
  let list
  try {
    list = usb.getDeviceList()
  } catch (err) {
    return { error: err.message || String(err), devices: [] }
  }
  const devices = []
  for (const device of list) {
    try {
      devices.push(await snapshotDevice(device))
    } catch (err) {
      console.error('Failed to read a device:', err)
    }
  }
  // "Recent" = attached during this session — that's what belongs in the main
  // area. We work it out by diffing each scan against the previous one, NOT from
  // detach-event data: libusb often can't populate a detached device's
  // portNumbers, so a key computed there wouldn't match and the replug would be
  // mis-archived. The first scan seeds the baseline (everything present at launch
  // is "background"); any key that shows up in a later scan but wasn't in the one
  // immediately before it was just physically plugged in — including a stick you
  // unplugged and reconnected, which is exactly what should return to the top.
  const keys = new Set(devices.map((x) => x.key))
  if (prevKeys === null) {
    prevKeys = keys
  } else {
    for (const k of keys) if (!prevKeys.has(k)) recentKeys.add(k)
    prevKeys = keys
  }
  for (const dev of devices) dev.isNew = recentKeys.has(dev.key)

  // Hubs last — the physical devices the user cares about float to the top.
  devices.sort((a, b) => Number(a.isHub) - Number(b.isHub))
  return { error: null, devices }
}

// Device-key sets for the "recent" diff. prevKeys = the previous scan; recentKeys
// = everything attached since launch (monotonic for the session).
let prevKeys = null
const recentKeys = new Set()

// Push a fresh snapshot to the renderer. Debounced because a single physical
// plug/unplug can fire several libusb events.
let pushTimer = null
function schedulePush() {
  if (pushTimer) clearTimeout(pushTimer)
  pushTimer = setTimeout(async () => {
    pushTimer = null
    if (!mainWindow) return
    const snapshot = await enumerate()
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('usb-devices', snapshot)
    }
  }, 150)
}

// ---------------------------------------------------------------------------
// Charging & power
//
// A USB-C charger delivers power but never enumerates on the USB bus, so libusb
// can't see it. The OS battery/power stack can, though — via a separate channel.
// IMPORTANT: what we read here is the charge rate INTO the battery, not the
// charger's negotiated USB-C PD contract (that lives in the port controller /
// UCSI and isn't exposed portably). The UI is labelled to say exactly that.
// ---------------------------------------------------------------------------

// Windows exposes live charge/discharge rate (mW) and voltage via WMI. Shell out
// to PowerShell rather than pull in a native module. Non-Windows returns null and
// we fall back to Electron's coarse on-battery flag.
function readWindowsBattery() {
  return new Promise((resolve) => {
    if (process.platform !== 'win32') return resolve(null)
    // Note: use `root/wmi` (forward slash) for the WMI namespace, not
    // `root\wmi`. A backslash here is fragile to escape correctly through
    // Node → PowerShell and, if mangled, the namespace silently fails to
    // resolve (empty result, no error). `@(...)[0]` indexes the first instance
    // without `Select-Object -First 1`, whose pipeline-stop signal CIM cmdlets
    // can swallow. Lines are newline-joined — `; ` breaks the hashtable literal.
    const script = [
      "$ErrorActionPreference='SilentlyContinue'",
      '$b = @(Get-CimInstance -Namespace root/wmi -ClassName BatteryStatus)[0]',
      '$w = @(Get-CimInstance -ClassName Win32_Battery)[0]',
      '[ordered]@{',
      '  charging = [bool]$b.Charging',
      '  powerOnline = [bool]$b.PowerOnline',
      '  chargeRateMw = [int]$b.ChargeRate',
      '  dischargeRateMw = [int]$b.DischargeRate',
      '  voltageMv = [int]$b.Voltage',
      '  percent = [int]$w.EstimatedChargeRemaining',
      '} | ConvertTo-Json -Compress'
    ].join('\n')
    execFile(
      'powershell.exe',
      ['-NoProfile', '-NonInteractive', '-Command', script],
      { timeout: 5000, windowsHide: true },
      (err, stdout) => {
        if (err) return resolve(null)
        try {
          resolve(JSON.parse(stdout.trim()))
        } catch {
          resolve(null)
        }
      }
    )
  })
}

async function readPower() {
  const win = await readWindowsBattery()
  const onBattery = powerMonitor.isOnBatteryPower()
  const chargeRateW =
    win && win.chargeRateMw ? +(win.chargeRateMw / 1000).toFixed(1) : null
  const dischargeRateW =
    win && win.dischargeRateMw ? +(win.dischargeRateMw / 1000).toFixed(1) : null
  return {
    supported: true,
    acConnected: win ? win.powerOnline : !onBattery,
    charging: win ? win.charging : false,
    chargeRateW,
    dischargeRateW,
    percent: win && win.percent ? win.percent : null,
    voltageV: win && win.voltageMv ? +(win.voltageMv / 1000).toFixed(2) : null,
    detailed: !!win // false = Electron coarse fallback (AC on/off only)
  }
}

let powerTimer = null
async function pushPower() {
  if (!mainWindow || mainWindow.isDestroyed()) return
  const status = await readPower()
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('power-status', status)
  }
}

// ---------------------------------------------------------------------------
// Window + app lifecycle
// ---------------------------------------------------------------------------

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 820,
    minWidth: 640,
    minHeight: 480,
    backgroundColor: '#f1f5f9',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })
  mainWindow = win
  win.on('closed', () => {
    if (powerTimer) clearInterval(powerTimer)
    powerTimer = null
    if (mainWindow === win) mainWindow = null
  })

  win.webContents.on('did-finish-load', () => {
    schedulePush()
    // Charge rate drifts continuously (95% trickles, a flat battery gulps), so
    // poll a few times a minute for a live number. AC plug/unplug also nudges
    // an immediate refresh via the powerMonitor events below.
    pushPower()
    if (powerTimer) clearInterval(powerTimer)
    powerTimer = setInterval(pushPower, 4000)
  })

  if (DEV_SERVER_URL) {
    win.loadURL(DEV_SERVER_URL)
    // DevTools is not opened automatically (it spams harmless "Autofill.enable
    // wasn't found" CDP errors and steals focus). Toggle it manually with
    // Ctrl+Shift+I / F12 — the default menu accelerator stays registered.
  } else {
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'))
  }

  // Keep external links (the UNI SIM navbar etc.) in the system browser.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      shell.openExternal(url)
      return { action: 'deny' }
    }
    return { action: 'allow' }
  })
  win.webContents.on('will-navigate', (event, url) => {
    if (DEV_SERVER_URL && url.startsWith(DEV_SERVER_URL)) return
    if (url.startsWith('http://') || url.startsWith('https://')) {
      event.preventDefault()
      shell.openExternal(url)
    }
  })
}

// Manual refresh button in the UI.
ipcMain.handle('usb-refresh', () => enumerate())
ipcMain.handle('power-refresh', () => readPower())

app.whenReady().then(() => {
  if (usb) {
    // Live plug / unplug — this is what makes the app feel magic: plug a stick
    // in and its card appears immediately.
    // A physical plug/unplug fires these; the next scan diffs itself against the
    // previous one to decide what's "recent" (see enumerate()), so both handlers
    // just trigger a rescan.
    usb.on('attach', schedulePush)
    usb.on('detach', schedulePush)
  }

  // Plugging / unplugging the charger flips these — refresh the power panel at
  // once rather than waiting for the next poll tick.
  powerMonitor.on('on-ac', pushPower)
  powerMonitor.on('on-battery', pushPower)
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
