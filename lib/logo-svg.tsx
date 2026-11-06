import type { CSSProperties } from "react";

/**
 * Flat (no gradient) mark for the generated icons: a moss leaf with the
 * letter A cut out in the paper colour.
 */
export function LogoSvg({
  size,
  bg = "#eef0e5",
  style,
}: {
  size: number;
  bg?: string;
  style?: CSSProperties;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={style}>
      <path
        d="M24 1.5C36.5 10 44 20 41.5 31 39.5 40 32 44.5 24 44.5 16 44.5 8.5 40 6.5 31 4 20 11.5 10 24 1.5Z"
        fill="#3d5a3a"
      />
      <path d="M24 44.5V47.5" stroke="#3d5a3a" strokeWidth="2" strokeLinecap="round" />
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
