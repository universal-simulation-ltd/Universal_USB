import { useEffect, useMemo, useState } from 'react'
import { AdvancedMenu, UniversalAppsNavBar, UpdateNotice } from '@unisim/sdk'
import type { PowerStatus, UsbDevice, UsbSnapshot } from './types'
import DeviceCard from './components/DeviceCard'
import PowerPanel from './components/PowerPanel'
import CableTester from './components/CableTester'
import ProductLogo from './components/ProductLogo'
import { CONTAINER } from './lib/layout'

const HIDDEN_STORAGE_KEY = 'usbdetector.hidden'
const PINNED_STORAGE_KEY = 'usbdetector.pinned'

function loadKeys(storageKey: string): Set<string> {
  try {
    const raw = localStorage.getItem(storageKey)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

export default function App() {
  const [snapshot, setSnapshot] = useState<UsbSnapshot | null>(null)
  const [scanning, setScanning] = useState(false)
  const [power, setPower] = useState<PowerStatus | null>(null)
  const [testing, setTesting] = useState(false)
  // Two persisted user overrides on the automatic placement:
  //   hidden  — X-ed out of the main area
  //   pinned  — revealed from the background area, stays in main across launches
  const [hidden, setHidden] = useState<Set<string>>(() => loadKeys(HIDDEN_STORAGE_KEY))
  const [pinned, setPinned] = useState<Set<string>>(() => loadKeys(PINNED_STORAGE_KEY))
  const bridge = typeof window !== 'undefined' ? window.usbBridge : undefined

  useEffect(() => {
    if (!bridge) return
    return bridge.onDevices(setSnapshot)
  }, [bridge])

  useEffect(() => {
    if (!bridge?.onPower) return
    return bridge.onPower(setPower)
  }, [bridge])

  useEffect(() => {
    try {
      localStorage.setItem(HIDDEN_STORAGE_KEY, JSON.stringify([...hidden]))
    } catch {
      /* storage unavailable — overrides just won't persist */
    }
  }, [hidden])

  useEffect(() => {
    try {
      localStorage.setItem(PINNED_STORAGE_KEY, JSON.stringify([...pinned]))
    } catch {
      /* storage unavailable — overrides just won't persist */
    }
  }, [pinned])

  const without = (set: Set<string>, key: string) => {
    const next = new Set(set)
    next.delete(key)
    return next
  }

  // Reveal a background device into the main area, and remember it.
  function reveal(key: string) {
    setPinned((prev) => new Set(prev).add(key))
    setHidden((prev) => without(prev, key))
  }

  // The X on a main-area card. If the device is only in main because the user
  // revealed it, X simply un-reveals it (back to background). Otherwise it's a
  // genuinely-plugged-in device, so X hides it.
  function removeFromMain(key: string) {
    if (pinned.has(key)) setPinned((prev) => without(prev, key))
    else setHidden((prev) => new Set(prev).add(key))
  }

  // The ↺ in the Hidden section.
  function unhide(key: string) {
    setHidden((prev) => without(prev, key))
  }

  async function refresh() {
    if (!bridge) return
    setScanning(true)
    try {
      setSnapshot(await bridge.refresh())
    } finally {
      setScanning(false)
    }
  }

  const devices = snapshot?.devices ?? []

  // Placement, most-specific override first:
  //   hidden           → Hidden section (restorable)
  //   pinned           → Main (user revealed it; sticks across launches)
  //   new / storage     → Main (plugged in since launch, or a flash drive/disk)
  //   everything else  → Built-in & already-connected (collapsed)
  const { main, background, hiddenList } = useMemo(() => {
    const main: UsbDevice[] = []
    const background: UsbDevice[] = []
    const hiddenList: UsbDevice[] = []
    for (const d of devices) {
      if (hidden.has(d.key)) hiddenList.push(d)
      else if (pinned.has(d.key)) main.push(d)
      else if ((d.isNew || d.isStorage) && !d.isHub) main.push(d)
      else background.push(d)
    }
    return { main, background, hiddenList }
  }, [devices, hidden, pinned])

  const btn =
    'rounded-lg bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-300 transition hover:bg-slate-50 disabled:opacity-50'

  return (
    <div className="flex min-h-full flex-col bg-slate-100 text-slate-900">
      {/* Shared suite chrome: brand strip + product logo/name + app switcher +
          changelog. The product name ("Universal USB Detector") is rendered from
          the SDK catalogue, so ProductLogo is icon-only. */}
      {/* ⚠️ No wrapper div here, and that is deliberate. This used to be a
          `<div className="relative z-50">`, which opened a stacking context and
          capped the bar's own inline `zIndex: 1000` at 50 in the root context.
          The one dialog in the app happened to also be 50 and later in document
          order, so it won the tie — by DOM order alone. Anything added before
          it in the tree, or any new dialog at z-50, would have lost. Mounting
          the bar bare (as every other Universal App does) lets its 1000 mean
          1000, and dialogs answer to their own number. */}
      <UniversalAppsNavBar
        product="usb"
        productLogo={<ProductLogo />}
        actions={
          /* Advanced — the SDK's own category, so every app in the suite has
             one in the same place, and whatever goes in it next is one change
             rather than nineteen. "About this app" is always its last row. */
          <AdvancedMenu
            about={{
              repo:    'https://github.com/universal-simulation-ltd/Universal_USB',
              subject: 'What the browser reads from the device',
              plural:  true,
              headline: 'Other tools want an install, or send what they find to a server.',
              version: __APP_VERSION__,
            }}
          />
        }
        productHomeHref={import.meta.env.BASE_URL}
        suiteSwitcherIconSrc={`${import.meta.env.BASE_URL}unisim-icon.png`}
        contentClassName={CONTAINER}
      />

      {/* Renders nothing until this tab is genuinely running superseded code.
          See the SDK's useAppUpdate: an autoUpdate PWA hands the new worker
          control but leaves the running page on its old JavaScript.

          ⚠️ `empty:hidden` is load-bearing, not tidiness — with the notice
          absent (which is almost always) the padding would otherwise sit there
          as a dead band under the bar's own border.

          ⚠️ This app has no service worker today: it ships as an Electron
          desktop build and nothing serves the bundle on the web, so
          useAppUpdate's `controllerchange` can never fire and this is inert.
          It is mounted anyway so USB matches every other Universal App — the
          day this bundle is served over HTTP with a worker, staleness is
          already reported instead of being silently discovered later. */}
      <div className={`${CONTAINER} pt-4 empty:hidden`}>
        <UpdateNotice />
      </div>

      <main className={`${CONTAINER} py-8`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            Plug something in — its details appear instantly. Nothing leaves your machine.
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={() => setTesting(true)} disabled={!bridge} className={btn}>
              🔌 Test a cable
            </button>
            <button type="button" onClick={refresh} disabled={!bridge || scanning} className={btn}>
              {scanning ? 'Scanning…' : '↻ Rescan'}
            </button>
          </div>
        </div>

        {!bridge && (
          <Banner tone="warn">
            The desktop USB bridge isn’t available — run this inside the Electron app
            (<code className="font-mono">npm run electron:dev</code>). In a plain browser tab there’s no
            device access.
          </Banner>
        )}

        {snapshot?.error && (
          <Banner tone="error">
            Couldn’t read USB devices: <span className="font-mono">{snapshot.error}</span>. On Windows
            you may need to <code className="font-mono">npm run rebuild</code> to build the native
            binding for Electron.
          </Banner>
        )}

        {power?.supported && (
          <div className="mt-6">
            <PowerPanel power={power} />
          </div>
        )}

        {bridge && !snapshot && (
          <p className="mt-10 text-center text-sm text-slate-500">Scanning for devices…</p>
        )}

        {snapshot && !snapshot.error && main.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white/50 p-10 text-center">
            <div className="text-4xl">🔌</div>
            <p className="mt-3 text-sm text-slate-600">
              Plug in a USB device and it’ll appear here automatically.
            </p>
            {background.length > 0 && (
              <p className="mt-1 text-xs text-slate-400">Built-in devices are tucked away below.</p>
            )}
          </div>
        )}

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {main.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              action={{
                /* An inline SVG, not U+2715 ✕ — iOS has no glyph for it and
                   WebKit does not fall back, so this drew ▯?▯ on the phone.
                   `aria-hidden`: DeviceCard names the button from `title`. */
                label: (
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                  </svg>
                ),
                title: 'Remove from main area',
                onClick: () => removeFromMain(device.key)
              }}
            />
          ))}
        </div>

        {background.length > 0 && (
          <Section label={`Built-in & already-connected (${background.length})`}>
            {background.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                action={{ label: '＋', title: 'Show in main area', onClick: () => reveal(device.key) }}
              />
            ))}
          </Section>
        )}

        {hiddenList.length > 0 && (
          <Section label={`Hidden (${hiddenList.length})`}>
            {hiddenList.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                action={{ label: '↺', title: 'Restore this device', onClick: () => unhide(device.key) }}
              />
            ))}
          </Section>
        )}
      </main>

      {testing && <CableTester devices={devices} onClose={() => setTesting(false)} />}
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <details className="mt-6">
      <summary className="cursor-pointer text-sm font-medium text-slate-500 hover:text-slate-800">
        {label}
      </summary>
      <div className="mt-4 grid gap-4 md:grid-cols-2">{children}</div>
    </details>
  )
}

function Banner({ tone, children }: { tone: 'warn' | 'error'; children: React.ReactNode }) {
  const styles =
    tone === 'error'
      ? 'bg-rose-50 text-rose-700 ring-rose-200'
      : 'bg-amber-50 text-amber-800 ring-amber-200'
  return <div className={`mt-6 rounded-xl px-4 py-3 text-sm ring-1 ${styles}`}>{children}</div>
}
