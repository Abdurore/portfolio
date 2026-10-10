"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export function ThemeToggle() {
  // The inline script in app/layout.tsx already sets data-theme on <html>
  // before hydration, so this reads the real value on first client render
  // instead of flashing the default and correcting it in an effect.
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    typeof document !== "undefined" &&
    document.documentElement.getAttribute("data-theme") === "light"
      ? "light"
      : "dark"
  );

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage unavailable (private mode, blocked, etc.) — the
      // preference just won't persist across visits.
    }
  };

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isLight}
      suppressHydrationWarning
      className="flex min-h-11 items-center gap-1.5 whitespace-nowrap border border-border px-3.5 font-sans text-xs font-medium text-muted transition-colors hover:border-accent hover:text-foreground"
      style={{ borderRadius: "1.1rem 0.3rem 1.1rem 0.3rem" }}
    >
      {isLight ? (
        <Sun className="h-3.5 w-3.5" aria-hidden="true" suppressHydrationWarning />
      ) : (
        <Moon className="h-3.5 w-3.5" aria-hidden="true" suppressHydrationWarning />
      )}
      <span suppressHydrationWarning>{isLight ? "Daylight" : "Night"}</span>
    </button>
  );
}
