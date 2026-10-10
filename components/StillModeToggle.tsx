"use client";

import { Pause, Play } from "lucide-react";
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
      className="flex min-h-11 items-center gap-1.5 whitespace-nowrap border border-border px-3.5 font-sans text-xs font-medium text-muted transition-colors hover:border-accent hover:text-foreground"
      style={{ borderRadius: "1.1rem 0.3rem 1.1rem 0.3rem" }}
    >
      {still ? (
        <Pause className="h-3.5 w-3.5" aria-hidden="true" suppressHydrationWarning />
      ) : (
        <Play className="h-3.5 w-3.5" aria-hidden="true" suppressHydrationWarning />
      )}
      Still mode
    </button>
  );
}
