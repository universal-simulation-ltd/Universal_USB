// A single USB device as snapshotted by the Electron main process
// (electron/main.cjs → snapshotDevice). Kept as plain data so it crosses the
// IPC bridge and matches the shape the WebUSB marketing demo produces too.
export interface UsbDevice {
  id: string
  key: string
  isNew: boolean
  vendorId: string
  productId: string
  manufacturer: string | null
  product: string | null
  serialNumber: string | null
  usbVersion: string
  generation: string
  speedLabel: string
  speedRate: string | null
  speedEstimated: boolean
  roles: string[]
  isHub: boolean
  isStorage: boolean
  dataCapable: boolean
  requestedMa: number | null
  requestedWatts: number | null
  busNumber: number
  deviceAddress: number
  portPath: string | null
}

export interface UsbSnapshot {
  error: string | null
  devices: UsbDevice[]
}

// Charging / power status, read from the OS battery stack (NOT the USB bus — a
// USB-C charger never enumerates). `chargeRateW` is power flowing into the
// battery, which is not the same as the charger's USB-C PD contract wattage.
export interface PowerStatus {
  supported: boolean
  acConnected: boolean
  charging: boolean
  chargeRateW: number | null
  dischargeRateW: number | null
  percent: number | null
  voltageV: number | null
  detailed: boolean // false = coarse AC-on/off fallback (non-Windows)
}
