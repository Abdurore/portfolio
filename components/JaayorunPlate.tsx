/**
 * Botanical plate for Jaayorun, which has no screenshot: one trunk
 * ("Jaayorun core") branching into the four connected apps. Static inline
 * SVG: ink-soft lines, moss nodes.
 */
const NODES = [
  { label: "Vendors", x: 60 },
  { label: "Customers", x: 180 },
  { label: "Riders", x: 300 },
  { label: "Staff", x: 420 },
];

export function JaayorunPlate() {
  return (
    <svg
      role="img"
      aria-labelledby="jaayorun-plate-title jaayorun-plate-desc"
      viewBox="0 0 480 340"
      className="h-full max-h-full w-full max-w-[600px]"
    >
      <title id="jaayorun-plate-title">Jaayorun architecture plate</title>
      <desc id="jaayorun-plate-desc">
        A diagram of one trunk labelled Jaayorun core branching into four
        connected apps: Vendors, Customers, Riders and Staff.
      </desc>

      <g fill="none" stroke="var(--ink-soft)" strokeWidth="1.5" strokeLinecap="round">
        <path d="M240 268 V206" />
        {NODES.map((n) => (
          <path key={n.label} d={`M240 206 C240 150 ${n.x} 150 ${n.x} 82`} />
        ))}
      </g>

      {NODES.map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy="72" r="10" fill="var(--moss)" />
          <text
            x={n.x}
            y="42"
            textAnchor="middle"
            fill="var(--ink)"
            fontSize="20"
            fontStyle="italic"
            style={{ fontFamily: "var(--font-petrona), Georgia, serif" }}
          >
            {n.label}
          </text>
        </g>
      ))}

      <rect
        x="150"
        y="268"
        width="180"
        height="44"
        rx="2"
        fill="var(--sheet)"
        stroke="var(--ink-soft)"
        strokeWidth="1.5"
      />
      <text
        x="240"
        y="296"
        textAnchor="middle"
        fill="var(--ink)"
        fontSize="20"
        style={{ fontFamily: "var(--font-petrona), Georgia, serif", fontWeight: 500 }}
      >
        Jaayorun core
      </text>
    </svg>
  );
}
