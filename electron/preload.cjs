const { contextBridge, ipcRenderer } = require('electron')

// The renderer is sandboxed (no Node / no node-usb). The main process does all
// the native USB work and pushes plain device snapshots here over IPC; this
// bridge is the only surface the React app sees.
let handler = null
let latest = null

ipcRenderer.on('usb-devices', (_event, snapshot) => {
  latest = snapshot
  if (handler) handler(snapshot)
})

let powerHandler = null
let latestPower = null

ipcRenderer.on('power-status', (_event, status) => {
  latestPower = status
  if (powerHandler) powerHandler(status)
})

contextBridge.exposeInMainWorld('usbBridge', {
  // Subscribe to device snapshots (fired on launch and on every plug/unplug).
  // Replays the most recent snapshot immediately if one already arrived before
  // React subscribed. Returns an unsubscribe function.
  onDevices(cb) {
    handler = cb
    if (latest) cb(latest)
    return () => {
      if (handler === cb) handler = null
    }
  },
  // Force a re-scan (the refresh button).
  refresh() {
    return ipcRenderer.invoke('usb-refresh')
  },
  // Subscribe to charging / power status (polled + on AC plug/unplug).
  onPower(cb) {
    powerHandler = cb
    if (latestPower) cb(latestPower)
    return () => {
      if (powerHandler === cb) powerHandler = null
    }
  }
})
