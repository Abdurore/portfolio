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
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav className="flex w-full max-w-3xl items-center justify-between rounded-full border border-border bg-background-elevated/70 px-4 py-2.5 backdrop-blur-xl shadow-[0_0_30px_-12px_rgba(139,92,246,0.4)]">
        <button
          onClick={() => handleClick("hero")}
          className="font-mono text-sm font-semibold tracking-tight text-foreground"
        >
          <span className="text-gradient animate-gradient-shift">ABDU</span>
          <span className="text-muted">.dev</span>
        </button>

        <ul className="hidden items-center gap-1 sm:flex">
          {LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleClick(link.id)}
                className={`rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
                  active === link.id
                    ? "bg-white/10 text-foreground"
                    : "text-muted hover:text-foreground"
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
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 font-mono text-xs font-medium text-foreground transition-colors hover:border-accent-violet hover:bg-white/5"
          >
            <Download className="h-3.5 w-3.5" />
            Resume
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-foreground px-4 py-1.5 font-mono text-xs font-medium text-background transition-transform hover:scale-105"
          >
            Say Hi
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 p-1 sm:hidden"
          aria-label="Toggle menu"
        >
          <span className="h-0.5 w-5 bg-foreground" />
          <span className="h-0.5 w-5 bg-foreground" />
        </button>
      </nav>

      {open && (
        <div className="absolute top-16 w-[90%] max-w-3xl rounded-2xl border border-border bg-background-elevated/95 p-3 backdrop-blur-xl sm:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleClick(link.id)}
                  className="w-full rounded-lg px-3 py-2 text-left font-mono text-sm text-muted hover:bg-white/5 hover:text-foreground"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex gap-2 border-t border-border pt-2">
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 font-mono text-sm text-foreground hover:bg-white/5"
            >
              <Download className="h-3.5 w-3.5" />
              Resume
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="flex-1 rounded-lg bg-foreground px-3 py-2 text-center font-mono text-sm font-medium text-background"
            >
              Say Hi
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
