"use client";

import { useId } from "react";
import { useInView } from "@/hooks/useInView";

/**
 * Two decorative background pieces that "rhyme": both are made of hollow,
 * outlined letters with a single lit word/letter, like one firefly landing
 * in the dark.
 *
 *  - VerseBackdrop: إن مع العسر يسرا (Quran 94:6, "with hardship comes
 *    ease"). The hardship word is a dashed hollow outline; the word for
 *    ease fills with warm light once the section scrolls into view.
 *  - YnwaBackdrop: YNWA, with the last A lit.
 *
 * Both are aria-hidden, non-interactive, and sit behind content.
 */

const WORD = { fontFamily: "var(--font-amiri), serif", fontSize: 230 } as const;

function Glow({ id, cx, cy, rx, ry }: { id: string; cx: number; cy: number; rx: number; ry: number }) {
  return (
    <>
      <defs>
        <radialGradient id={id}>
          <stop offset="0" stopColor="var(--firefly)" stopOpacity="0.5" />
          <stop offset="1" stopColor="var(--firefly)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse className="bg-glow" cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${id})`} />
    </>
  );
}

export function VerseBackdrop({ className = "", bottom = false }: { className?: string; bottom?: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const gid = useId();
  return (
    <div
      ref={ref}
      data-in-view={inView}
      aria-hidden="true"
      className={`bg-text pointer-events-none absolute ${bottom ? "bottom-0 h-96" : "inset-y-0"} left-1/2 w-screen -translate-x-1/2 select-none overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 1370 360"
        className="absolute left-1/2 top-1/2 w-[94%] max-w-5xl overflow-visible -translate-x-1/2 -translate-y-1/2"
        focusable="false"
      >
        <Glow id={gid} cx={200} cy={190} rx={240} ry={150} />
        <g style={WORD} textAnchor="middle" direction="rtl">
          <text className="bg-hollow" x={1233} y={260} lang="ar">إن</text>
          <text className="bg-hollow" x={974} y={260} lang="ar">مع</text>
          <text className="bg-hollow bg-hardship" x={608} y={260} lang="ar">العسر</text>
          <text className="bg-lit" x={190} y={260} lang="ar">يسرا</text>
        </g>
      </svg>
    </div>
  );
}

export function YnwaBackdrop({ className = "" }: { className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const gid = useId();
  return (
    <div
      ref={ref}
      data-in-view={inView}
      aria-hidden="true"
      className={`bg-text pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 select-none overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 1000 320"
        className="absolute left-1/2 top-1/2 w-[120%] min-w-[640px] max-w-none overflow-visible -translate-x-1/2 -translate-y-1/2 sm:w-[90%]"
        focusable="false"
      >
        <Glow id={gid} cx={800} cy={170} rx={200} ry={150} />
        <g
          style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 280, fontWeight: 800 }}
          textAnchor="middle"
        >
          <text className="bg-hollow" x={150} y={260}>Y</text>
          <text className="bg-hollow" x={400} y={260}>N</text>
          <text className="bg-hollow" x={640} y={260}>W</text>
          <text className="bg-lit" x={870} y={260}>A</text>
        </g>
      </svg>
    </div>
  );
}
