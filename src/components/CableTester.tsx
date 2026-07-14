import { useEffect, useRef, useState } from 'react'
import type { UsbDevice } from '../types'

// A cable on its own is invisible to software — the host only ever sees a
// *device*. So the only honest way to test a cable's data lines is empirical:
// capture the devices present when the test starts, ask the user to plug a
// known device THROUGH the cable, and watch for a new enumeration. If one
// appears, the cable carries data (and power). If nothing appears, it's either
// a charge-only cable, a non-data device, or a device needing its own power.
type Phase = 'waiting' | 'detected' | 'timeout'

const TIMEOUT_MS = 30000

export default function CableTester({
  devices,
  onClose
}: {
  devices: UsbDevice[]
  onClose: () => void
}) {
  const [phase, setPhase] = useState<Phase>('waiting')
  const [found, setFound] = useState<UsbDevice | null>(null)
  // Devices present when the test (re)started — anything beyond this set is what
  // the user just plugged in through the cable.
  const startKeys = useRef<Set<string>>(new Set(devices.map((d) => d.key)))
  const timer = useRef<number | null>(null)

  // Arm the timeout whenever we (re)enter the waiting phase.
  useEffect(() => {
    if (phase !== 'waiting') return
    timer.current = window.setTimeout(() => setPhase('timeout'), TIMEOUT_MS)
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [phase])

  // Watch each fresh snapshot for a device that wasn't there at the start.
  // Prefer a non-hub device (the thing the user plugged in, not a hub in the cable).
  useEffect(() => {
    if (phase !== 'waiting') return
    const fresh =
      devices.find((d) => !startKeys.current.has(d.key) && !d.isHub) ??
      devices.find((d) => !startKeys.current.has(d.key))
    if (fresh) {
      setFound(fresh)
      setPhase('detected')
    }
  }, [devices, phase])

  function restart() {
    startKeys.current = new Set(devices.map((d) => d.key))
    setFound(null)
    setPhase('waiting')
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6 ring-1 ring-slate-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Cable data test</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid size-7 place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        {phase === 'waiting' && (
          <div className="mt-4">
            <ol className="space-y-2 text-sm text-slate-700">
              <li>
                <span className="mr-1 font-semibold text-slate-500">1.</span> Plug a USB device you
                know works — a flash drive is ideal — into <strong>one end</strong> of the cable.
              </li>
              <li>
                <span className="mr-1 font-semibold text-slate-500">2.</span> Plug the{' '}
                <strong>other end</strong> into this computer.
              </li>
            </ol>
            <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
              <span className="size-2.5 animate-ping rounded-full bg-emerald-500" />
              <span className="text-sm text-slate-700">Watching for a device to appear…</span>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Tip: if the device is already plugged in, unplug it and plug it back in through the
              cable you want to test.
            </p>
          </div>
        )}

        {phase === 'detected' && found && (
          <div className="mt-4">
            <div className="rounded-xl bg-emerald-50 px-4 py-4 ring-1 ring-emerald-200">
              <p className="text-sm font-semibold text-emerald-700">
                ✅ This cable carries data <span className="font-normal text-emerald-600">(and power)</span>
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Detected <strong>{found.product || `${found.vendorId}:${found.productId}`}</strong>
                {found.speedRate ? ` — ${found.usbVersion}, ${found.speedRate}` : ` — ${found.usbVersion}`}.
              </p>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              A charge-only cable would never let a device enumerate, so seeing one confirms the data
              lines are wired. (This doesn’t measure the cable’s current rating — that needs a
              hardware tester.)
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={restart}
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50"
              >
                Test another
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {phase === 'timeout' && (
          <div className="mt-4">
            <div className="rounded-xl bg-amber-50 px-4 py-4 ring-1 ring-amber-200">
              <p className="text-sm font-semibold text-amber-800">⚠️ No new device detected</p>
              <p className="mt-2 text-sm text-slate-700">That usually means one of:</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                <li>• The cable is <strong>charge-only</strong> (power, no data)</li>
                <li>• The device you plugged in isn’t a data device</li>
                <li>• The device needs its own power supply</li>
              </ul>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Try again with a known-good USB flash drive to be sure it’s the cable.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={restart}
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50"
              >
                Try again
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
