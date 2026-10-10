const FIREFLIES = Array.from({ length: 12 }, (_, i) => {
  // Deterministic pseudo-random placement so server/client markup match.
  const seed = i * 137.5;
  const left = (seed * 1.3) % 100;
  const top = (seed * 0.7 + 15) % 85;
  const duration = 5 + (i % 5);
  const delay = (i % 7) * 0.6;
  const driftX = 10 + (i % 4) * 6;
  const driftY = -(10 + (i % 3) * 8);
  return { id: i, left, top, duration, delay, driftX, driftY };
});

/** Up to 12 CSS-animated dots, decorative, hero only. */
export function Fireflies() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {FIREFLIES.map((f) => (
        <span
          key={f.id}
          className="firefly absolute h-1 w-1 rounded-full bg-firefly shadow-[0_0_8px_3px_color-mix(in_srgb,var(--firefly)_55%,transparent),0_0_2px_1px_var(--firefly)]"
          style={
            {
              left: `${f.left}%`,
              top: `${f.top}%`,
              "--duration": `${f.duration}s`,
              "--delay": `${f.delay}s`,
              "--drift-x": `${f.driftX}px`,
              "--drift-y": `${f.driftY}px`,
              "--firefly-opacity": 0.8,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
