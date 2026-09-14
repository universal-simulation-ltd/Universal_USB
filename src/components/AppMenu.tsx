import type { ReactNode } from 'react'
import { AdvancedMenu, MENU } from '@unisim/sdk'
// Generated — `npm run credits` after any dependency change. Never edit it by
// hand: it is read off the installed tree, so a hand-kept list drifts from the
// lockfile the first time anyone upgrades anything, and a credits list naming a
// package we removed is worse than no list at all.
import credits from '../generated/credits.json'
import { useThemeStore, type ThemePref } from '../stores/themeStore'

// The per-app rows that slot into <UniversalAppsNavBar />'s `actions` prop —
// ROWS ONLY, no trigger and no panel of its own. The SDK renders them inside
// the merged profile pill, so the bar carries one dropdown on the right.
//
// Styling is inline rather than Tailwind to match the SDK dropdown's own rows
// (the same 8px/14px rhythm and 13px label its profile and language rows use).
//
// ⚠️ EVERY COLOUR COMES FROM THE SDK'S `MENU` PALETTE, never a literal. The SDK
// paints this dropdown dark when the bar's `theme` is dark, but these rows are
// ours and it cannot reach them — a hard-coded `#374151` label would sit
// unreadable on the dark panel. `MENU[theme]` is the same palette the panel
// itself is painted from, so the two cannot disagree.

type Palette = (typeof MENU)['light']

const THEMES: { pref: ThemePref; label: string; glyph: string }[] = [
  { pref: 'light', label: 'Light', glyph: '☀️' },
  { pref: 'dark', label: 'Dark', glyph: '🌙' },
  // 'system' is offered but is deliberately NOT the default — see themeStore.
  { pref: 'system', label: 'Match my device', glyph: '🖥️' },
]

export default function AppMenu() {
  const pref = useThemeStore((s) => s.pref)
  const setPref = useThemeStore((s) => s.setPref)
  // The RESOLVED theme — what is on screen, with 'system' already answered.
  const theme = useThemeStore((s) => s.effective)
  const m = MENU[theme]

  return (
    <>
      <MenuLabel m={m}>Appearance</MenuLabel>
      {THEMES.map((t) => (
        <MenuRow
          key={t.pref}
          m={m}
          glyph={t.glyph}
          label={t.label}
          selected={pref === t.pref}
          onClick={() => setPref(t.pref)}
        />
      ))}

      {/* Advanced — the SDK's own category, so every app in the suite has one in
          the same place, and whatever goes in it next is one change rather than
          nineteen. "About this app" is always its last row. ⚠️ `theme` is not
          optional here: its rows are inline-styled too, and left on the default
          they render as a pale strip in a dark dropdown. */}
      <AdvancedMenu
        theme={theme}
        about={{
          repo:    'https://github.com/universal-simulation-ltd/Universal_USB',
          subject: 'What the browser reads from the device',
          plural:  true,
          headline: 'Other tools want an install, or send what they find to a server.',
          version: __APP_VERSION__,
          credits,
          noticesHref: 'https://github.com/universal-simulation-ltd/Universal_USB/blob/main/THIRD-PARTY-NOTICES.md',
        }}
      />
    </>
  )
}

function MenuLabel({ m, children }: { m: Palette; children: ReactNode }) {
  return (
    <div
      style={{
        padding: '8px 14px 4px',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: m.muted,
      }}
    >
      {children}
    </div>
  )
}

function MenuRow({
  m,
  glyph,
  label,
  onClick,
  selected = false,
}: {
  m: Palette
  glyph: string
  label: string
  onClick: () => void
  selected?: boolean
}) {
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={selected}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        padding: '8px 14px',
        fontSize: 13,
        fontFamily: 'inherit',
        textAlign: 'left',
        border: 0,
        background: selected ? m.accentBg : 'transparent',
        color: selected ? m.accentText : m.body,
        cursor: 'pointer',
        transition: 'background 120ms, color 120ms',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = m.accentBg
        e.currentTarget.style.color = m.accentText
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = selected ? m.accentBg : 'transparent'
        e.currentTarget.style.color = selected ? m.accentText : m.body
      }}
    >
      <span aria-hidden>{glyph}</span>
      <span style={{ flex: 1, minWidth: 0, fontWeight: 500, lineHeight: 1.3 }}>{label}</span>
      {selected && <span aria-hidden style={{ color: m.accentText }}>✓</span>}
    </button>
  )
}
