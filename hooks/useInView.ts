"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Pairs with the [data-reveal]/[data-reveal-group] CSS in globals.css.
 * Sets data-in-view="true" on the ref'd element once it's ~15% visible,
 * then disconnects (reveals once, like the old whileInView).
 */
export function useInView<T extends HTMLElement>(amount = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(() => {
    // Server has no window at all — start hidden, matching a modern
    // client's pre-observation state, and reveal once observed below.
    if (typeof window === "undefined") return false;
    // A real client without IntersectionObserver support (old browser):
    // there's no way to detect visibility, so show content immediately
    // rather than hiding it forever.
    return typeof IntersectionObserver === "undefined";
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: amount }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [amount]);

  return { ref, inView };
}
