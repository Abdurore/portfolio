"use client";

import { profile } from "@/data/profile";
import { ScrollReveal, ScrollRevealGroup, revealItemVariants } from "./ScrollReveal";
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-4xl px-6 py-28">
      <ScrollReveal>
        <p className="font-mono text-xs uppercase tracking-widest text-accent-cyan">
          01 / About
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Building products end-to-end, from UI to deployment.
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1} className="mt-8">
        <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {profile.bio}
        </p>
        <p className="mt-4 max-w-2xl text-sm text-muted">
          Currently studying {profile.education.degree} at{" "}
          {profile.education.school} ({profile.education.status}).
        </p>
      </ScrollReveal>

      <ScrollRevealGroup className="mt-12 grid grid-cols-3 gap-4 sm:max-w-lg">
        {profile.stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={revealItemVariants}
            className="rounded-2xl border border-border bg-background-elevated/50 px-4 py-5 text-center"
          >
            <p className="text-2xl font-semibold text-gradient sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-muted">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </ScrollRevealGroup>

      <ScrollRevealGroup className="mt-12 flex flex-wrap gap-2.5">
        {profile.skills.map((skill) => (
          <motion.span
            key={skill}
            variants={revealItemVariants}
            className="rounded-full border border-border bg-background-elevated/60 px-3.5 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent-violet hover:text-foreground"
          >
            {skill}
          </motion.span>
        ))}
      </ScrollRevealGroup>
    </section>
  );
}
