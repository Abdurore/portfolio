"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { ScrollReveal } from "./ScrollReveal";
import { Magnetic } from "./Magnetic";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "./BrandIcons";

const SOCIAL_LINKS = [
  { label: "GitHub", href: profile.socials.github, icon: GithubIcon },
  { label: "LinkedIn", href: profile.socials.linkedin, icon: LinkedinIcon },
  { label: "X / Twitter", href: profile.socials.x, icon: XIcon },
  { label: "Instagram", href: profile.socials.instagram, icon: InstagramIcon },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-4xl px-6 py-28 text-center"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan/10 blur-[120px]" />

      <ScrollReveal className="relative">
        <p className="font-mono text-xs uppercase tracking-widest text-accent-cyan">
          04 / Contact
        </p>
        <h2 className="mx-auto mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-5xl">
          Got an idea worth{" "}
          <span className="text-gradient animate-gradient-shift">
            building
          </span>
          ?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted">
          I&apos;m open to full-stack roles, freelance builds, and
          collaborations. Drop a line, I read every email.
        </p>

        <Magnetic>
          <motion.a
            href={`mailto:${profile.email}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 font-mono text-sm font-medium text-background"
          >
            <Mail className="h-4 w-4" />
            {profile.email}
          </motion.a>
        </Magnetic>

        <div className="mt-10 flex items-center justify-center gap-3">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background-elevated/60 text-muted transition-colors hover:border-accent-violet hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </motion.a>
          ))}
        </div>
      </ScrollReveal>

      <footer className="relative mt-24 border-t border-border pt-8">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name} ({profile.alias}). Built
          with Next.js &amp; Tailwind CSS.
        </p>
      </footer>
    </section>
  );
}
