"use client";

import { Moon } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

// The inline head script has already set data-theme before hydration.
// useSyncExternalStore reads it without a hydration mismatch: the server
// snapshot is "light", and the client corrects to the real value at once.
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}
function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}
function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  const toggle = () => {
    const root = document.documentElement;
    const next: Theme = isDark ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      // 150ms colour crossfade, only while switching.
      root.classList.add("theme-fade");
      window.setTimeout(() => root.classList.remove("theme-fade"), 200);
    }
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage unavailable (private mode): the choice just won't persist.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label="Dark mode"
      className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md border border-ink-soft px-3 text-sm font-medium text-ink"
    >
      <Moon className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline" aria-hidden="true">
        Dark mode
      </span>
    </button>
  );
}
