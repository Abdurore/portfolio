"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#audits", label: "Audits" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const linkClass =
  "link-plain inline-flex min-h-11 items-center px-1 text-[15px] font-medium";

export function Nav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Escape closes the menu and returns focus to the button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus leaving the header closes the menu, so it never hangs open
  // behind the page as keyboard focus moves on.
  const onBlur = (e: FocusEvent<HTMLElement>) => {
    if (open && !e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setOpen(false);
    }
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-rule bg-paper"
      onBlur={onBlur}
    >
      <div className="shell flex min-h-16 items-center justify-between gap-4">
        <Link href="/" className="link-plain inline-flex min-h-11 items-center font-serif text-xl font-semibold">
          Abdurore
        </Link>

        <div className="flex items-center gap-2">
          <nav aria-label="Primary">
            <ul className="hidden items-center gap-4 md:flex">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={profile.resumeUrl} className={linkClass}>
                  Résumé
                </a>
              </li>
            </ul>

            <button
              ref={buttonRef}
              type="button"
              className="inline-flex min-h-11 items-center gap-2 rounded-md border border-ink-soft px-3 text-sm font-medium text-ink md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
              Menu
            </button>

            <ul
              id="mobile-menu"
              hidden={!open}
              className="absolute inset-x-0 top-full border-b border-rule bg-paper px-5 pb-4 pt-2 sm:px-8 md:hidden"
            >
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`${linkClass} w-full`}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={profile.resumeUrl}
                  className={`${linkClass} w-full`}
                  onClick={() => setOpen(false)}
                >
                  Résumé
                </a>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
