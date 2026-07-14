// Bridge exposed by the Electron preload script (electron/preload.cjs). Absent
// in the browser / WebUSB build.
import type { PowerStatus, UsbSnapshot } from './types'

export {}

declare global {
  interface Window {
    usbBridge?: {
      /** Subscribe to device snapshots (launch + every plug/unplug). Returns an unsubscribe fn. */
      onDevices(cb: (snapshot: UsbSnapshot) => void): () => void
      /** Force a re-scan. */
      refresh(): Promise<UsbSnapshot>
      /** Subscribe to charging / power status (polled + on AC change). Returns an unsubscribe fn. */
      onPower(cb: (status: PowerStatus) => void): () => void
    }
  }
}
