// GENERATED FILE — do not edit by hand.
// Source: backoffice/universal-platform/scripts/app-marks/marks.mjs
// Regenerate: node scripts/app-marks/build.mjs (from backoffice/universal-platform)
// Mark: Universal USB Detector — The USB trident.
// Hover: The two branch terminals come up as the device is identified.
//
// Icon-only by design: the SDK's UniversalAppsNavBar renders the product name
// from its catalogue beside this slot, so a wordmark here would print it twice.

const CSS = `
  /* Resting states */
  .uam-usb-termL { opacity: 0.2; transform: scale(0.4); transition: opacity .35s ease .05s, transform .4s cubic-bezier(0.16,1,0.3,1) .05s; transform-origin: center; transform-box: fill-box; }
  .uam-usb-termR { opacity: 0.2; transform: scale(0.4); transition: opacity .35s ease .16s, transform .4s cubic-bezier(0.16,1,0.3,1) .16s; transform-origin: center; transform-box: fill-box; }

  /* Active states */
  .uam-host-usb:hover .uam-usb-termL,
  .uam-host-usb:focus-visible .uam-usb-termL { opacity: 1; transform: scale(1); }
  .uam-host-usb:hover .uam-usb-termR,
  .uam-host-usb:focus-visible .uam-usb-termR { opacity: 1; transform: scale(1); }

  @media (prefers-reduced-motion: reduce) {
    .uam-usb-termL,
    .uam-usb-termR { transition: none !important; }
  }
`

export default function ProductLogo() {
  return (
    <span
      className="uam-host-usb inline-flex h-6 w-6 shrink-0 items-center justify-center"
      aria-hidden="true"
    >
      <style>{CSS}</style>
      <svg viewBox="0 0 64 64" className="h-6 w-6" aria-hidden="true">
        <defs>
          <linearGradient id="uam-nav-usb-tile" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fe8c01" />
            <stop offset="1" stopColor="#e05504" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="url(#uam-nav-usb-tile)" />
        <g fill="none" strokeWidth={4.4} strokeLinecap="round" strokeLinejoin="round" stroke="#ffffff">
          <path d="M32 16v32" />
          <path d="M32 30l-8 5v5" />
          <path d="M32 26l8 5v4" />
        </g>
        <path d="M32 11l-5.2 8h10.4z" fill="#fed7aa" />
        <circle cx={32} cy={49} r={4.2} fill="#fed7aa" />
        <rect x={20.6} y={38.8} width={6.8} height={6.8} rx={1.2} fill="#fed7aa" className="uam-usb-termL" />
        <circle cx={40} cy={34} r={3.8} fill="#fed7aa" className="uam-usb-termR" />
      </svg>
    </span>
  )
}
