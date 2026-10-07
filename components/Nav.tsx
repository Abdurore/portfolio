"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";
import { StillModeToggle } from "./StillModeToggle";

const LINKS = [
  { id: "about", label: "About" },
  { id: "featured", label: "Featured" },
  { id: "experience", label: "Experience" },
  { id: "practice", label: "Practice" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));

    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleClick = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-border bg-background/90 backdrop-saturate-150"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4"
      >
        <button
          onClick={() => handleClick("hero")}
          className="flex items-center gap-2 font-serif text-lg font-semibold tracking-tight text-foreground"
        >
          <span
            className="flex h-7 w-7 items-center justify-center border border-accent text-accent"
            style={{ borderRadius: "0.8rem 0.2rem 0.8rem 0.2rem" }}
            aria-hidden="true"
          >
            A
          </span>
          Abdurore
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleClick(link.id)}
                aria-current={active === link.id ? "true" : undefined}
                className={`border-b-2 px-3 py-1.5 text-sm transition-colors ${
                  active === link.id
                    ? "border-accent text-foreground"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <StillModeToggle />
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex min-h-11 items-center gap-1.5 border border-border px-4 font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <Download className="h-3.5 w-3.5" />
            Resume
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-11 items-center border border-accent bg-accent px-4 font-medium text-background transition-opacity hover:opacity-85"
          >
            Say Hi
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-0.5 w-5 bg-foreground transition-transform ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-foreground transition-transform ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
          <span className="sr-only">
            {open ? "Close menu" : "Open menu"}
          </span>
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background lg:hidden"
        >
          <ul className="flex flex-col divide-y divide-border">
            {LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleClick(link.id)}
                  className="w-full px-6 py-3 text-left text-sm text-muted hover:bg-background-elevated hover:text-foreground"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 border-t border-border p-3">
            <ThemeToggle />
            <StillModeToggle />
          </div>
          <div className="flex gap-2 border-t border-border p-3">
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 border border-border px-3 text-sm text-foreground hover:border-accent hover:text-accent"
            >
              <Download className="h-3.5 w-3.5" />
              Resume
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-11 flex-1 items-center justify-center border border-accent bg-accent px-3 text-sm font-medium text-background"
            >
              Say Hi
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
