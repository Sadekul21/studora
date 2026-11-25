export default function ClapperArt() {
  return (
    <svg viewBox="0 0 600 600" aria-hidden="true" className="absolute inset-0 size-full">
      <defs>
        <linearGradient id="spotlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d08a5f" stopOpacity=".55" />
          <stop offset="1" stopColor="#d08a5f" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="#171613" />
      <path d="M0 430 Q300 400 600 430 L600 600 L0 600Z" fill="#25231f" />
      <path d="M300 70 L180 470 L420 470 Z" fill="url(#spotlight)" />
      <ellipse cx="300" cy="470" rx="140" ry="22" fill="#d08a5f" fillOpacity=".18" />
      <rect x="276" y="44" width="48" height="34" rx="4" fill="#36322c" stroke="#6b6359" />
      <rect x="292" y="20" width="16" height="26" fill="#36322c" />

      <g transform="translate(205 300) rotate(-8)">
        <rect x="0" y="40" width="190" height="120" rx="6" fill="#f5f0e8" />
        <g transform="rotate(-14 0 40)">
          <rect x="0" y="12" width="190" height="30" rx="4" fill="#171613" />
          <path d="M18 12 L36 42 M58 12 L76 42 M98 12 L116 42 M138 12 L156 42" stroke="#f5f0e8" strokeWidth="12" />
        </g>
        <rect x="0" y="40" width="190" height="20" fill="#171613" />
        <path d="M18 40 L36 60 M58 40 L76 60 M98 40 L116 60 M138 40 L156 60" stroke="#f5f0e8" strokeWidth="12" />
        <text x="16" y="92" fontFamily="var(--font-manrope), sans-serif" fontSize="13" fill="#6b6359" letterSpacing="1.5">
          SCENE
        </text>
        <text x="112" y="92" fontFamily="var(--font-manrope), sans-serif" fontSize="13" fill="#6b6359" letterSpacing="1.5">
          TAKE
        </text>
        <text x="14" y="138" fontFamily="var(--font-bodoni), Georgia, serif" fontSize="40" fill="#171613">
          404
        </text>
        <text x="112" y="138" fontFamily="var(--font-bodoni), Georgia, serif" fontSize="40" fill="#b66d43">
          01
        </text>
        <path d="M100 76 V150" stroke="#dccfbe" />
      </g>

      <g stroke="#f5f0e8" strokeOpacity=".6" strokeWidth="2" fill="none">
        <path d="M28 48 V28 H48" />
        <path d="M552 28 H572 V48" />
        <path d="M28 552 V572 H48" />
        <path d="M552 572 H572 V552" />
      </g>
      <circle cx="44" cy="76" r="5" fill="#d08a5f" className="animate-pulse" />
      <text x="58" y="81" fontFamily="var(--font-manrope), sans-serif" fontSize="13" fill="#f5f0e8" letterSpacing="2">
        REC · 00:04:04
      </text>
    </svg>
  );
}
