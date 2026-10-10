import type { SVGProps } from "react";
import { pinnate, wedge } from "@/lib/foliage";

type Props = SVGProps<SVGSVGElement>;

/** Small sprout mark used in status chips and beside headings. */
export function LeafGlyph(props: Props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M8 15V8.2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M8 8.4C8 4.6 10.4 2 14.6 1.6 14.8 5.8 12.4 8.6 8 8.4Z"
        fill="currentColor"
      />
      <path
        d="M8 10.6C8 8.2 6.3 6.6 3 6.5 2.9 9.3 4.7 11 8 10.6Z"
        fill="currentColor"
        fillOpacity=".6"
      />
    </svg>
  );
}

const PALM = pinnate({
  from: [24, 236],
  control: [58, 44],
  to: [236, 34],
  pairs: 26,
  leafLength: 72,
  leafWidth: 0.09,
  angleBase: 70,
  angleTip: 30,
  droop: 0.6,
});

/** Palm frond: curved spine with ~50 tapering, gravity-sagged leaflets. */
export function PalmFrond(props: Props) {
  return (
    <svg
      viewBox="-10 -30 290 290"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d={PALM.leafletsB} fill="currentColor" fillOpacity=".55" />
      <path d={PALM.leafletsA} fill="currentColor" fillOpacity=".9" />
      <path d={PALM.rachis} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

const FERN = pinnate({
  from: [100, 262],
  control: [86, 130],
  to: [128, 12],
  pairs: 22,
  leafLength: 50,
  leafWidth: 0.2,
  angleBase: 80,
  angleTip: 40,
  droop: 0.15,
});

/** Fern frond: shorter, rounder leaflets that shrink toward the tip. */
export function Fern(props: Props) {
  return (
    <svg
      viewBox="30 0 190 270"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d={FERN.leafletsB} fill="currentColor" fillOpacity=".5" />
      <path d={FERN.leafletsA} fill="currentColor" fillOpacity=".85" />
      <path d={FERN.rachis} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// Monstera: veins leave the midrib at (100, ry) and sweep up and out. The
// fenestrations are slits cut along alternate veins and small holes between
// them. [ry, angle° above horizontal]
const MONSTERA_SLITS: [number, number][] = [
  [58, 42],
  [82, 30],
  [106, 18],
  [128, 8],
];
const MONSTERA_VEINS: [number, number][] = [
  [48, 50],
  [70, 36],
  [94, 24],
  [117, 13],
  [138, 2],
];

function rayEnd(ry: number, deg: number, side: 1 | -1, len: number): [number, number] {
  const a = (deg * Math.PI) / 180;
  return [100 + side * Math.cos(a) * len, ry - Math.sin(a) * len];
}

/** Monstera leaf with real fenestrations: slits and holes cut by a mask. */
export function MonsteraLeaf(props: Props) {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <defs>
        <mask id="monstera-cut" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="220">
          <rect width="200" height="220" fill="#fff" />
          <g stroke="#000" strokeOpacity=".38" strokeWidth="1" strokeLinecap="round">
            <path d="M100 150V8" />
            {MONSTERA_VEINS.flatMap(([ry, deg]) =>
              ([1, -1] as const).map((side) => {
                const [x, y] = rayEnd(ry, deg, side, 92);
                return <path key={`v${ry}${side}`} d={`M100 ${ry}L${x} ${y}`} />;
              })
            )}
          </g>
          <g fill="#000">
            {MONSTERA_SLITS.flatMap(([ry, deg]) =>
              ([1, -1] as const).map((side) => {
                const [x1, y1] = rayEnd(ry, deg, side, 108);
                const [x2, y2] = rayEnd(ry, deg, side, 26);
                return <path key={`s${ry}${side}`} d={wedge(x1, y1, x2, y2, 4.2, 0.7)} />;
              })
            )}
            {([1, -1] as const).flatMap((side) =>
              [
                [70, 20],
                [95, 12],
              ].map(([ry, deg], i) => {
                const [cx, cy] = rayEnd(ry + 3, deg, side, 40 + i * 6);
                return (
                  <ellipse
                    key={`h${side}${i}`}
                    cx={cx}
                    cy={cy}
                    rx="2.6"
                    ry="6"
                    transform={`rotate(${side * (62 - deg)} ${cx} ${cy})`}
                  />
                );
              })
            )}
          </g>
        </mask>
      </defs>
      <g mask="url(#monstera-cut)">
        <path
          d="M100 140C78 174 22 164 12 108 4 66 44 28 100 4 156 28 196 66 188 108 178 164 122 174 100 140Z"
          fill="currentColor"
          fillOpacity=".9"
        />
      </g>
      <path
        d="M100 142C101 170 98 196 90 216"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * The Abdurore mark: a leaf with the letter A cut out of it. The A is a real
 * cut-out (mask), so the mark works on any background.
 */
export function LogoMark({ id = "logo", ...props }: Props & { id?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false" {...props}>
      <defs>
        <linearGradient id={`${id}-fill`} x1="10" y1="4" x2="38" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--sage)" }} />
          <stop offset="1" style={{ stopColor: "var(--fern)" }} />
        </linearGradient>
        <mask id={`${id}-cut`} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
          <rect width="48" height="48" fill="#fff" />
          <path
            d="M16 36.5 24 16l8 20.5M18.9 29.5h10.2"
            stroke="#000"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </mask>
      </defs>
      <g mask={`url(#${id}-cut)`}>
        <path
          d="M24 1.5C36.5 10 44 20 41.5 31 39.5 40 32 44.5 24 44.5 16 44.5 8.5 40 6.5 31 4 20 11.5 10 24 1.5Z"
          fill={`url(#${id}-fill)`}
        />
      </g>
      <path d="M24 44.5V47.5" stroke="var(--fern)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
