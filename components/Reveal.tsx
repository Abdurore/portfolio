"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

/** CSS-driven replacement for the old framer-motion ScrollReveal. */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
}) {
  const { ref, inView } = useInView();
  return (
    <Tag
      ref={ref as never}
      data-reveal
      data-in-view={inView}
      style={delay ? { transitionDelay: `${delay * 1000}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** CSS-driven replacement for the old framer-motion ScrollRevealGroup. */
export function RevealGroup({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ol" | "ul";
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <Tag
      ref={ref as never}
      data-reveal-group
      data-in-view={inView}
      className={className}
    >
      {children}
    </Tag>
  );
}
