/**
 * The one botanical drawing on the site: a pressed tropical almond
 * (Terminalia catappa) branch, common in Lagos. Static line art in ink-soft
 * and moss at about 1.4px, hidden from assistive technology.
 *
 * Leaf geometry is generated: an obovate outline (widest past the middle,
 * rounded tip, narrow base) with a midrib and curved pinnate veins.
 */
const L = 100; // leaf length in drawing units
const HALF_WIDTH = 29; // widest half-width: a broad leaf, width about 0.58 of length

const r = (n: number) => Math.round(n * 10) / 10;

/** Half-width at u in 0..1 along the leaf; peaks at u = 0.7 / 1.2. */
function hw(u: number) {
  const peak = Math.pow(0.7 / 1.2, 0.7) * Math.pow(0.5 / 1.2, 0.5);
  return (HALF_WIDTH * Math.pow(u, 0.7) * Math.pow(1 - u, 0.5)) / peak;
}

function outline() {
  const steps = 28;
  const top: string[] = [];
  const bottom: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const u = i / steps;
    top.push(`${r(u * L)} ${r(-hw(u))}`);
    bottom.unshift(`${r(u * L)} ${r(hw(u))}`);
  }
  return `M${top.join(" L")} L${bottom.slice(1).join(" L")} Z`;
}

function veins() {
  const out: string[] = [];
  for (const u of [0.13, 0.25, 0.37, 0.49, 0.61, 0.73, 0.85]) {
    const eu = Math.min(u + 0.14, 0.96);
    const w = hw(eu) * 0.9;
    for (const side of [-1, 1]) {
      out.push(
        `M${r(u * L)} 0 Q${r((u + 0.06) * L)} ${r(side * w * 0.22)} ${r(eu * L)} ${r(side * w)}`
      );
    }
  }
  return out.join(" ");
}

const OUTLINE = outline();
const VEINS = veins();

/** One leaf, base at the origin, pointing along +x. */
function Leaf({ transform }: { transform: string }) {
  return (
    <g transform={transform}>
      <path
        d={OUTLINE}
        fill="var(--paper)"
        stroke="var(--moss)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={VEINS}
        fill="none"
        stroke="var(--ink-soft)"
        strokeWidth="1"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={`M-6 0 L${L * 0.97} 0`}
        fill="none"
        stroke="var(--ink-soft)"
        strokeWidth="1.4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </g>
  );
}

// Positions are in px relative to the portrait mount's top-left corner.
// The twig starts under the mount and crosses its top-left corner; four
// leaves sit on its last stretch, so their tips and half of each blade show
// past the edge, as if pressed under the mount. Back to front.
const LEAVES = [
  { x: 6, y: 14, a: 172, s: 0.55 },
  { x: 4, y: 6, a: -100, s: 0.65 },
  { x: -30, y: -12, a: -125, s: 0.62 },
  { x: -40, y: -16, a: -155, s: 0.8 },
];

/** The branch, drawn in a zero-size overflow-visible svg anchored at the
 *  mount's top-left corner. */
export function AlmondBranch({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="1"
      height="1"
      className={`pointer-events-none overflow-visible ${className}`}
    >
      <path
        d="M250 140 C175 112 100 66 44 36 S-14 -3 -40 -16"
        fill="none"
        stroke="var(--ink-soft)"
        strokeWidth="1.8"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      {LEAVES.map((l, i) => (
        <Leaf key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.a}) scale(${l.s})`} />
      ))}
    </svg>
  );
}

/** A single leaf, for the closing moment beside the email address. */
export function AlmondLeaf({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="-12 -34 124 68"
      className={className}
    >
      <Leaf transform="rotate(-8)" />
    </svg>
  );
}
