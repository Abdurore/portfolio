/**
 * Decorative vine running down the left edge of a section on desktop;
 * a plain border-left below 1024px. Must sit inside an element that
 * gets data-in-view="true" (see Reveal) for the draw-in transition to
 * fire — see the .growth-line rule in globals.css.
 */
export function GrowthLine() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 -left-6 hidden w-6 sm:block"
    >
      <div className="absolute inset-y-0 left-[3px] w-px bg-border lg:hidden" />
      <svg
        className="growth-line hidden h-full w-6 lg:block"
        viewBox="0 0 24 400"
        preserveAspectRatio="none"
        fill="none"
        style={{ "--vine-length": 900 } as React.CSSProperties}
      >
        <path
          d="M12 0 C 3 50, 21 100, 12 150 S 2 250, 12 300 S 22 370, 12 400"
          stroke="var(--moss)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
