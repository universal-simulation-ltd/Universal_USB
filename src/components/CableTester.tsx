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

  // The action row for the current phase. It is pinned OUTSIDE the scrolling
  // body (see the card's comment below), so it lives here rather than at the
  // end of each phase's block — on a phone the buttons stay reachable however
  // long the explanation above them gets.
  const actions =
    phase === 'detected' ? (
      <>
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
      </>
    ) : phase === 'timeout' ? (
      <>
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
      </>
    ) : null

  return (
    <div
      /* ⚠️ z-[1100], not z-50. <UniversalAppsNavBar /> sets an INLINE
         `zIndex: 1000`, which no Tailwind class can reach — Tailwind's scale
         stops at z-50 — and which an inline style would win against anyway. In
         the rest of the suite a z-50 overlay leaves the bar brightly lit on top
         of the backdrop, painting over the dialog's own header.

         ⚠️ It did NOT do that here, and the history is worth knowing before
         somebody "simplifies" it back. `App.tsx` used to wrap the bar in a
         `relative z-50` div, which capped the bar's inline 1000 at 50 in the
         root stacking context — and this overlay, also 50 but LATER in
         document order, won the tie. Verified both ways at 390×300 with
         `document.elementFromPoint`: the title and the close button were the
         elements at their own centres at z-50 as well as at z-[1100]. So z-50
         was not a bug, it was one accident away from one: reorder these two
         subtrees and the bar wins. That wrapper has since been removed
         (2026-08-30), so the bar's 1000 now genuinely means 1000 and this
         overlay MUST be above it on its own number. 1100 is that number.

         The padding carries the safe-area insets so the dialog clears the
         Dynamic Island and the home indicator on a phone; in a desktop browser
         both insets are 0 and this is the old `p-4`. */
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-slate-900/40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]"
      onClick={onClose}
    >
      {/* A column that never outgrows the padded overlay: the title row and the
          action row are pinned and only the middle scrolls. `100%` is the
          overlay minus its safe-area padding; `100svh` is the SMALL viewport,
          which is what is actually on screen in mobile Safari while the
          toolbars are showing — the shorter of the two is the one that fits.
          Previously the whole card was one box with `p-6`, so on a short screen
          the heading and the close button scrolled away with the content. */}
      <div
        className="flex max-h-[min(100%,100svh)] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Cable data test</h2>
          {/* An inline SVG X, not U+2715 ✕ — iOS's system font has no glyph for
              that codepoint and WebKit does not fall back past it, so the ONE
              way out of this dialog drew as an empty ▯?▯ box on a phone. See
              Docs_UNI_SIM/landmines.md. */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-7 shrink-0 place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* min-h-0 so this can actually shrink inside the flex column — without
            it a flex item's min-height is its content and nothing scrolls. */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-5">
          {phase === 'waiting' && (
            <div>
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
            <div>
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
            </div>
          )}

          {phase === 'timeout' && (
            <div>
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
            </div>
          )}
        </div>

        {actions && (
          <div className="flex shrink-0 justify-end gap-2 border-t border-slate-200 px-6 py-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}
