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
      <ScrollReveal className="relative">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          <span className="text-accent">[04]</span> Contact
        </p>
        <h2 className="mx-auto mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-5xl">
          Got an idea worth <span className="text-accent">building</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted">
          I&apos;m open to full-stack roles, freelance builds, and
          collaborations. Drop a line, I read every email.
        </p>

        <Magnetic>
          <motion.a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-flex items-center gap-2 border border-accent bg-accent px-7 py-3.5 font-mono text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            <Mail className="h-4 w-4" />
            {profile.email}
          </motion.a>
        </Magnetic>

        <div className="mt-10 flex items-center justify-center gap-3">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center border border-border bg-background-elevated/60 text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Icon className="h-4 w-4" />
            </a>
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
