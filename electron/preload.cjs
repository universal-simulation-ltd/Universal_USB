const { contextBridge, ipcRenderer } = require('electron')

// The renderer is sandboxed (no Node / no node-usb). The main process does all
// the native USB work and pushes plain device snapshots here over IPC; this
// bridge is the only USB surface the React app sees (the SDK's desktop bridge
// at the foot of this file is the other one).
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

// The SDK's desktop bridge (main.cjs, see @unisim/sdk/electron), the page's
// only other surface:
//
//   • hub handoff (`installHubHandoff`): hub links open in a window this app
//     owns, signed in as the current user, instead of the system browser,
//     which has never seen the session;
//   • "Sign in with your browser" (`installBrowserSignIn`, SDK 0.221.0): the
//     SDK's sign-in dialog opens the hub's sign-in page in the system browser,
//     so someone already signed in to UNI·SIM there presses Continue once and
//     comes back signed in. The main process runs the loopback listener.
//
// ⚠️ Spelled out rather than required from the SDK on purpose: a sandboxed
// preload's `require` resolves only `electron` and a few built-ins. This is the
// SDK's PRELOAD_SNIPPET verbatim; its channel names must match.
contextBridge.exposeInMainWorld('unisimDesktop', {
  openHub: (url, session) => ipcRenderer.invoke('unisim:open-hub', { url, session }),
  clearHub: () => ipcRenderer.invoke('unisim:clear-hub'),
  signInWithBrowser: (opts) => ipcRenderer.invoke('unisim:browser-sign-in', opts),
  cancelSignInWithBrowser: () => ipcRenderer.invoke('unisim:browser-sign-in-cancel'),
  // One sign-in for every UNI·SIM desktop app on this computer (SDK 0.232.0):
  // signed in to another suite app here, this one signs itself in on start,
  // with a session of its own; "Sign out of every UNI·SIM app on this
  // computer" reaches it too. The grant never leaves the main process.
  suiteSession: (opts) => ipcRenderer.invoke('unisim:suite-session', opts),
  onSuiteSessionChange: (cb) => {
    const h = () => cb()
    ipcRenderer.on('unisim:suite-session-changed', h)
    return () => ipcRenderer.removeListener('unisim:suite-session-changed', h)
  },
})
