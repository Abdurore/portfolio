import type { CSSProperties } from "react";

/**
 * Satori-friendly (no mask/CSS vars) version of the LogoMark in
 * components/Botanical.tsx, for the generated icons and social image.
 * The A is drawn in the background colour instead of cut out.
 */
export function LogoSvg({
  size,
  bg = "#0a0d09",
  style,
}: {
  size: number;
  bg?: string;
  style?: CSSProperties;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={style}>
      <defs>
        <linearGradient id="g" x1="10" y1="4" x2="38" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#b9d4a6" />
          <stop offset="1" stopColor="#7fb069" />
        </linearGradient>
      </defs>
      <path
        d="M24 1.5C36.5 10 44 20 41.5 31 39.5 40 32 44.5 24 44.5 16 44.5 8.5 40 6.5 31 4 20 11.5 10 24 1.5Z"
        fill="url(#g)"
      />
      <path d="M24 44.5V47.5" stroke="#7fb069" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M16 36.5 24 16l8 20.5M18.9 29.5h10.2"
        stroke={bg}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
