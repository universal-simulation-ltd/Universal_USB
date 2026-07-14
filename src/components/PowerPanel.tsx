import type { PowerStatus } from '../types'

// Charging & power, read from the OS battery stack — deliberately kept separate
// from the USB device list because a charger never enumerates on the USB bus.
export default function PowerPanel({ power }: { power: PowerStatus }) {
  const { acConnected, charging, chargeRateW, dischargeRateW, percent, voltageV, detailed } = power

  const headline = charging
    ? '🔌 Charging'
    : acConnected
      ? '🔌 Plugged in — not charging'
      : '🔋 On battery'

  // The single most interesting number: watts into the battery while charging,
  // or watts out of it while running on battery.
  const rate = charging ? chargeRateW : !acConnected ? dischargeRateW : null
  const rateLabel = charging ? 'into battery' : 'from battery'

  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-900">{headline}</h2>
        {percent != null && (
          <span className="text-sm font-medium text-slate-500">Battery {percent}%</span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <Stat
          label={charging || !acConnected ? `Rate ${rateLabel}` : 'Rate'}
          value={rate != null ? `${rate} W` : '—'}
        />
        <Stat label="Battery voltage" value={voltageV != null ? `${voltageV} V` : '—'} />
        <Stat label="Power source" value={acConnected ? 'AC adapter' : 'Battery'} />
      </div>

      <p className="mt-3 flex items-start gap-1.5 text-[0.72rem] leading-relaxed text-slate-500">
        <span className="mt-px">ℹ️</span>
        <span>
          {detailed ? (
            <>
              This is the charge rate <strong className="text-slate-700">into the battery</strong> — not
              the charger’s USB-C <strong className="text-slate-700">Power Delivery</strong> wattage.
              At a high charge% the battery only sips power even from a big charger, and Windows can’t
              see the negotiated PD contract (that lives in the port controller).
            </>
          ) : (
            <>Only coarse AC on/off is available on this platform — detailed charge rate is Windows-only.</>
          )}
        </span>
      </p>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 px-3 py-2.5 ring-1 ring-slate-200">
      <div className="text-[0.7rem] font-medium uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-0.5 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  )
}
