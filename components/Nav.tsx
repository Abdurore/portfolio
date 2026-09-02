"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { profile } from "@/data/profile";

const LINKS = [
  { id: "about", label: "About" },
  { id: "featured", label: "Featured" },
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
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-border bg-background/90 backdrop-saturate-150"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <button
          onClick={() => handleClick("hero")}
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-foreground"
        >
          <span className="flex h-6 w-6 items-center justify-center border border-accent text-accent">
            A
          </span>
          ABDU<span className="text-muted">.dev</span>
        </button>

        <ul className="hidden items-center gap-1 sm:flex">
          {LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleClick(link.id)}
                className={`border-b-2 px-3 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
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

        <div className="hidden items-center gap-2 sm:flex">
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-1.5 border border-border px-4 py-1.5 font-mono text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <Download className="h-3.5 w-3.5" />
            Resume
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="border border-accent bg-accent px-4 py-1.5 font-mono text-xs font-medium text-background transition-opacity hover:opacity-85"
          >
            Say Hi
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 p-1 sm:hidden"
          aria-label="Toggle menu"
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
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background sm:hidden">
          <ul className="flex flex-col divide-y divide-border">
            {LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleClick(link.id)}
                  className="w-full px-6 py-3 text-left font-mono text-sm text-muted hover:bg-background-elevated hover:text-foreground"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 border-t border-border p-3">
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex flex-1 items-center justify-center gap-1.5 border border-border px-3 py-2 font-mono text-sm text-foreground hover:border-accent hover:text-accent"
            >
              <Download className="h-3.5 w-3.5" />
              Resume
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="flex-1 border border-accent bg-accent px-3 py-2 text-center font-mono text-sm font-medium text-background"
            >
              Say Hi
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
