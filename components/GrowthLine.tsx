const HEIGHT = 1600;
const STEP = 6;

// Stem: a gentle sine wandering around x=14.
const xAt = (y: number) => 14 + 4.5 * Math.sin(y / 70);
const STEM = Array.from({ length: HEIGHT / STEP + 1 }, (_, i) => {
  const y = i * STEP;
  return `${i === 0 ? "M" : "L"}${xAt(y).toFixed(1)} ${y}`;
}).join("");

// A leaf every 120px, alternating sides, sized a touch smaller going down.
const LEAVES = Array.from({ length: Math.floor((HEIGHT - 80) / 120) }, (_, i) => {
  const y = 90 + i * 120;
  const side = i % 2 === 0 ? 1 : -1;
  const scale = 1 - i * 0.02;
  return { y, side, scale, i };
});

/**
 * Decorative vine growing down the left edge of a section on desktop; a
 * plain border-left on small screens. The stem draws in and the leaves
 * unfurl once an ancestor gets data-in-view="true" (see Reveal and the
 * .growth-line rules in globals.css). Hidden from assistive tech.
 */
export function GrowthLine() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 -left-6 hidden w-6 overflow-hidden sm:block"
    >
      <div className="absolute inset-y-0 left-[3px] w-px bg-border lg:hidden" />
      <svg
        className="growth-line hidden h-full w-6 lg:block"
        viewBox={`0 0 28 ${HEIGHT}`}
        preserveAspectRatio="xMidYMin slice"
        fill="none"
        style={{ "--vine-length": HEIGHT + 200 } as React.CSSProperties}
      >
        <path
          className="vine-stem"
          d={STEM}
          stroke="var(--moss)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {LEAVES.map(({ y, side, scale, i }) => (
          <g
            key={i}
            transform={`translate(${xAt(y).toFixed(1)} ${y}) rotate(${side * 52}) scale(${scale.toFixed(2)})`}
          >
            <path
              className="vine-leaf"
              style={{ "--leaf-delay": `${0.35 + i * 0.09}s` } as React.CSSProperties}
              d="M0 0C3 -5 9 -8 15 -7 13 -1 7 3 0 0Z"
              fill="var(--fern)"
              fillOpacity=".5"
              transform={side === 1 ? undefined : "scale(-1 1)"}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
