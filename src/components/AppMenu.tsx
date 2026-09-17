import { AdvancedMenu } from '@unisim/sdk'
// Generated — `npm run credits` after any dependency change. Never edit it by
// hand: it is read off the installed tree, so a hand-kept list drifts from the
// lockfile the first time anyone upgrades anything, and a credits list naming a
// package we removed is worse than no list at all.
import credits from '../generated/credits.json'
import { useThemeStore } from '../stores/themeStore'

// The per-app rows that slot into <UniversalAppsNavBar />'s `actions` prop —
// ROWS ONLY, no trigger and no panel of its own. The SDK renders them inside
// the merged profile pill, so the bar carries one dropdown on the right.
//
// Styling is inline rather than Tailwind to match the SDK dropdown's own rows
// (the same 8px/14px rhythm and 13px label its profile and language rows use).
//
// ⚠️ ANY ROW ADDED HERE TAKES EVERY COLOUR FROM THE SDK'S `MENU` PALETTE, never
// a literal. The SDK paints this dropdown dark when the bar's `theme` is dark,
// but these rows are ours and it cannot reach them — a hard-coded `#374151`
// label would sit unreadable on the dark panel. `MENU[theme]` is the same
// palette the panel itself is painted from, so the two cannot disagree.
//
// There is no Appearance section here any more. Since SDK 0.143 the colour
// scheme is a Global preference with a per-app override in the SDK's own App
// preferences dialog (App.tsx passes `themeStore`), so a second copy of the
// control here would only be a second place to disagree with it. What is left
// is the SDK's Advanced category.

export default function AppMenu() {
  // The RESOLVED theme — what is on screen, with 'system' already answered.
  const theme = useThemeStore((s) => s.effective)

  return (
    <>
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
