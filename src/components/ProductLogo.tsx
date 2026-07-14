// Universal USB Detector brand mark — icon-only, mirroring the family style
// (orange rounded square + white glyph, matching Universal PDF's ProductLogo).
// The wordmark is rendered next to it by the app header.
export default function ProductLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" aria-hidden="true">
      <rect width="24" height="24" rx="5" fill="#ea580c" />
      <g fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        {/* trident stem */}
        <path d="M12 6.2 V17.4" />
        {/* branches */}
        <path d="M12 11.2 L8.9 13 V14.6" />
        <path d="M12 9.6 L15.1 11.4 V12.9" />
      </g>
      {/* top arrow head */}
      <path d="M12 4.2 L10.3 7 H13.7 Z" fill="#fff" />
      {/* base hub dot */}
      <circle cx="12" cy="18.4" r="1.5" fill="#fff" />
      {/* left square terminal */}
      <rect x="7.8" y="14.4" width="2.2" height="2.2" rx="0.4" fill="#fff" />
      {/* right round terminal */}
      <circle cx="15.1" cy="12.6" r="1.2" fill="#fff" />
    </svg>
  )
}
