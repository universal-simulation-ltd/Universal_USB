import type { UsbDevice } from '../types'

// Colour the generation badge so USB 3 devices "pop" green, USB 2 amber, older
// grey — a quick at-a-glance signal of how modern the connection is.
function generationClasses(generation: string): string {
  if (generation.startsWith('USB 3') || generation.startsWith('USB 4'))
    return 'bg-emerald-50 text-emerald-700 ring-emerald-200'
  if (generation === 'USB 2') return 'bg-amber-50 text-amber-700 ring-amber-200'
  return 'bg-slate-100 text-slate-600 ring-slate-200'
}

function iconFor(device: UsbDevice): string {
  if (device.isHub) return '🔀'
  const role = device.roles[0] || ''
  if (role.includes('Storage')) return '💾'
  if (role.includes('HID')) return '⌨️'
  if (role.includes('Camera') || role.includes('Video')) return '📷'
  if (role.includes('Audio')) return '🎧'
  if (role.includes('Wireless')) return '📶'
  if (role.includes('Printer')) return '🖨️'
  return '🔌'
}

function Spec({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-lg bg-slate-50 px-3 py-2.5 ring-1 ring-slate-200">
      <div className="text-[0.7rem] font-medium uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-0.5 text-sm font-semibold text-slate-900">{value}</div>
      {hint && <div className="mt-0.5 text-[0.7rem] text-slate-400">{hint}</div>}
    </div>
  )
}

export default function DeviceCard({
  device,
  action
}: {
  device: UsbDevice
  action?: { label: string; title: string; onClick: () => void }
}) {
  const name = device.product || `Device ${device.vendorId}:${device.productId}`
  const maker = device.manufacturer || 'Unknown vendor'

  return (
    <div className="card-in relative rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          title={action.title}
          className="absolute right-3 top-3 grid size-7 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          {action.label}
        </button>
      )}
      <div className="flex items-start gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-slate-100 text-2xl">
          {iconFor(device)}
        </div>
        <div className="min-w-0 flex-1 pr-6">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-semibold text-slate-900">{name}</h3>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${generationClasses(
                device.generation
              )}`}
            >
              {device.generation}
            </span>
          </div>
          <p className="mt-0.5 truncate text-sm text-slate-500">{maker}</p>
          <p className="mt-0.5 font-mono text-xs text-slate-400">
            {device.vendorId}:{device.productId}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <Spec
          label="Speed"
          value={device.speedRate ?? '—'}
          hint={device.speedEstimated ? `${device.speedLabel} (max for version)` : device.speedLabel}
        />
        <Spec label="USB version" value={device.usbVersion} hint="from device descriptor" />
        <Spec
          label="Connection"
          value={device.dataCapable ? 'Data + power' : 'Power only'}
          hint={device.dataCapable ? 'data lines active' : 'no data'}
        />
        <Spec
          label="Requested power"
          value={device.requestedMa != null ? `${device.requestedMa} mA` : '—'}
          hint={device.requestedWatts != null ? `≈ ${device.requestedWatts} W @ 5 V` : undefined}
        />
        <Spec label="Role" value={device.roles[0] ?? 'Unknown'} hint={device.roles.slice(1).join(', ') || undefined} />
        <Spec
          label="Location"
          value={`Bus ${device.busNumber} · Addr ${device.deviceAddress}`}
          hint={device.portPath ? `port ${device.portPath}` : undefined}
        />
      </div>

      {device.serialNumber && (
        <p className="mt-3 font-mono text-xs text-slate-400">
          Serial: <span className="text-slate-600">{device.serialNumber}</span>
        </p>
      )}

      <p className="mt-3 flex items-start gap-1.5 text-[0.72rem] leading-relaxed text-slate-500">
        <span className="mt-px">ℹ️</span>
        <span>
          <strong className="text-slate-700">Requested power</strong> is what this device asks for in
          software. True USB-C <strong className="text-slate-700">Power Delivery</strong> wattage (up
          to 240&nbsp;W) is negotiated in the port hardware and needs an inline PD tester to read.
        </span>
      </p>
    </div>
  )
}
