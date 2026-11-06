/**
 * The one botanical illustration on the site: a pressed sprig mounted on the
 * hero portrait sheet. Static, line art only (ink-soft stem, moss leaves),
 * and hidden from assistive technology.
 */
// side: 1 = leaf points up and to the right, -1 = up and to the left.
const LEAVES = [
  { x: 31, y: 100, side: -1, s: 1 },
  { x: 31, y: 86, side: 1, s: 1 },
  { x: 33, y: 68, side: -1, s: 0.9 },
  { x: 33, y: 54, side: 1, s: 0.85 },
  { x: 34, y: 36, side: -1, s: 0.7 },
  { x: 34, y: 24, side: 1, s: 0.6 },
];

export function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 64 124"
      fill="none"
      className={className}
    >
      <path
        d="M31 122 C29 92 37 60 34 6"
        stroke="var(--ink-soft)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {LEAVES.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) scale(${l.side * l.s} ${l.s}) rotate(-48)`}>
          <path
            d="M0 0 C6 -9 20 -10 28 0 C20 10 6 9 0 0 Z M2 0 H26"
            stroke="var(--moss)"
            strokeWidth="1.4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  );
}
