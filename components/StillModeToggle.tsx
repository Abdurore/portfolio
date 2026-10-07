"use client";

import { useState } from "react";

export function StillModeToggle() {
  // The inline script in app/layout.tsx already sets data-still on <html>
  // before hydration, so this reads the real value on first client render.
  const [still, setStill] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.getAttribute("data-still") === "true"
  );

  const toggle = () => {
    const next = !still;
    setStill(next);
    if (next) {
      document.documentElement.setAttribute("data-still", "true");
    } else {
      document.documentElement.removeAttribute("data-still");
    }
    try {
      localStorage.setItem("stillMode", String(next));
    } catch {
      // localStorage unavailable — preference won't persist, motion
      // still stops for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={still}
      suppressHydrationWarning
      className="flex min-h-11 items-center gap-1.5 border border-border px-3 font-sans text-xs font-medium text-muted transition-colors hover:border-accent hover:text-foreground"
    >
      <span aria-hidden="true" suppressHydrationWarning>
        {still ? "⏸" : "▶"}
      </span>
      Still mode
    </button>
  );
}
