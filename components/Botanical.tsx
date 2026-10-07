import type { SVGProps } from "react";

/** Small sprout mark used next to section headings and status chips. */
export function LeafGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 14.5V7" />
      <path d="M8 7c0-3.5 2.5-5.5 6-5.5C13.5 5 11 7 8 7Z" />
      <path d="M8 9.5c0-2.3-1.7-3.8-4.2-3.8C4.3 8.3 6 9.9 8 9.5Z" />
    </svg>
  );
}

/** Hand-drawn-style palm frond, used to frame the hero. */
export function PalmFrond(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M10 210 C 40 150, 70 90, 100 20" />
      <path d="M100 20 C 70 40, 40 55, 10 60" />
      <path d="M100 20 C 85 55, 65 85, 35 105" />
      <path d="M100 20 C 95 65, 85 105, 65 140" />
      <path d="M100 20 C 112 60, 115 100, 108 140" />
      <path d="M100 20 C 125 50, 150 70, 180 78" />
      <path d="M100 20 C 118 45, 142 60, 170 65" />
    </svg>
  );
}

/** Hand-drawn-style monstera leaf, used in the footer. */
export function MonsteraLeaf(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 160 180"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M80 170 V 100" />
      <path d="M80 100 C 20 100, 15 55, 45 20 C 65 0, 95 0, 115 20 C 148 55, 142 100, 80 100Z" />
      <path d="M62 30 C 58 50, 60 70, 70 85" />
      <path d="M98 30 C 102 50, 100 70, 90 85" />
      <circle cx="55" cy="55" r="4" />
      <circle cx="105" cy="55" r="4" />
      <circle cx="80" cy="40" r="4" />
    </svg>
  );
}

/** Hand-drawn-style fern frond, used as a small flourish. */
export function Fern(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M60 200 V 20" />
      {[30, 55, 80, 105, 130, 155].map((y) => (
        <g key={y}>
          <path d={`M60 ${y} C 45 ${y - 8}, 30 ${y - 4}, 18 ${y + 6}`} />
          <path d={`M60 ${y + 14} C 75 ${y + 6}, 90 ${y + 10}, 102 ${y + 20}`} />
        </g>
      ))}
    </svg>
  );
}
