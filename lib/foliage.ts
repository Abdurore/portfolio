/**
 * Deterministic generators for the botanical artwork. Everything here is
 * pure maths on fixed inputs, so server and client render identical SVG.
 */

type Pt = [number, number];

const f = (n: number) => Math.round(n * 10) / 10;

function bezier(p0: Pt, p1: Pt, p2: Pt, t: number): Pt {
  const u = 1 - t;
  return [
    u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
    u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1],
  ];
}

function tangent(p0: Pt, p1: Pt, p2: Pt, t: number): Pt {
  const dx = 2 * (1 - t) * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
  const dy = 2 * (1 - t) * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
  const len = Math.hypot(dx, dy) || 1;
  return [dx / len, dy / len];
}

export type PinnateOptions = {
  /** Rachis (spine) as a quadratic curve from base to tip. */
  from: Pt;
  control: Pt;
  to: Pt;
  /** Number of leaflet pairs. */
  pairs: number;
  /** Longest leaflet length. */
  leafLength: number;
  /** Leaflet width as a fraction of its length. */
  leafWidth?: number;
  /** Angle (deg) between leaflet and rachis at the base / at the tip. */
  angleBase?: number;
  angleTip?: number;
  /** How much leaflets sag with gravity (0 = none). */
  droop?: number;
  /** Where along the rachis leaflets start (0–1). */
  start?: number;
};

export type Pinnate = {
  rachis: string;
  /** Alternate leaflets split in two so they can be shaded differently. */
  leafletsA: string;
  leafletsB: string;
};

/** Builds a feather/palm/fern frond: a spine with tapering paired leaflets. */
export function pinnate(o: PinnateOptions): Pinnate {
  const {
    from,
    control,
    to,
    pairs,
    leafLength,
    leafWidth = 0.16,
    angleBase = 68,
    angleTip = 28,
    droop = 0.35,
    start = 0.14,
  } = o;
  let a = "";
  let b = "";
  for (let i = 0; i < pairs; i++) {
    const t = start + ((1 - start) * i) / (pairs - 1 || 1);
    const base = bezier(from, control, to, t);
    const [tx, ty] = tangent(from, control, to, t);
    // Leaflets are longest a little below the middle, then taper to the tip.
    const len =
      leafLength * (0.28 + 0.72 * Math.sin(Math.PI * Math.min(1, 0.18 + 0.82 * (1 - t) ** 0.8)));
    const ang = ((angleBase + (angleTip - angleBase) * t) * Math.PI) / 180;
    for (const side of [-1, 1] as const) {
      const cos = Math.cos(side * ang);
      const sin = Math.sin(side * ang);
      const dx = tx * cos - ty * sin;
      const dy = tx * sin + ty * cos;
      // Gravity bends the leaflet's far end toward +y.
      const tip: Pt = [base[0] + dx * len, base[1] + dy * len + droop * len * 0.45];
      const mid: Pt = [
        base[0] + dx * len * 0.5,
        base[1] + dy * len * 0.5 + droop * len * 0.1,
      ];
      const w = len * leafWidth;
      const px = -dy;
      const py = dx;
      const c1: Pt = [mid[0] + px * w, mid[1] + py * w];
      const c2: Pt = [mid[0] - px * w, mid[1] - py * w];
      const d = `M${f(base[0])} ${f(base[1])}Q${f(c1[0])} ${f(c1[1])} ${f(tip[0])} ${f(tip[1])}Q${f(c2[0])} ${f(c2[1])} ${f(base[0])} ${f(base[1])}Z`;
      if ((i + (side === 1 ? 1 : 0)) % 2 === 0) a += d;
      else b += d;
    }
  }
  const rachis = `M${from[0]} ${from[1]}Q${control[0]} ${control[1]} ${to[0]} ${to[1]}`;
  return { rachis, leafletsA: a, leafletsB: b };
}

/** Tapered wedge (a leaf slit): wide at (x1,y1), narrowing toward (x2,y2). */
export function wedge(x1: number, y1: number, x2: number, y2: number, w1: number, w2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const pts: Pt[] = [
    [x1 + nx * w1, y1 + ny * w1],
    [x2 + nx * w2, y2 + ny * w2],
    [x2 - nx * w2, y2 - ny * w2],
    [x1 - nx * w1, y1 - ny * w1],
  ];
  return `M${pts.map((p) => `${f(p[0])} ${f(p[1])}`).join("L")}Z`;
}
