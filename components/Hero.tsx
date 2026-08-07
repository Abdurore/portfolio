"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { profile } from "@/data/profile";

const TECH_STRIP = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "FastAPI",
  "Framer Motion",
  "Git",
  "Vercel",
];

export function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (glowRef.current) {
      glowRef.current.style.setProperty("--x", `${x}px`);
      glowRef.current.style.setProperty("--y", `${y}px`);
    }
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-grid pt-24"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity"
        style={{
          background:
            "radial-gradient(600px circle at var(--x, 50%) var(--y, 30%), rgba(139,92,246,0.15), transparent 60%)",
        }}
      />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-accent-violet/20 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent-lime"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
            </span>
            Available for frontend work
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl"
          >
            Hi, I&apos;m{" "}
            <span className="text-gradient animate-gradient-shift">
              {profile.alias}
            </span>
            <br />
            Frontend Developer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {profile.tagline} Founder of{" "}
            <span className="text-foreground">Cardora</span> — building
            interactive products from UI to deployment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#featured"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("featured")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-mono text-sm font-medium text-background transition-transform hover:scale-105"
            >
              View Projects
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-mono text-sm font-medium text-foreground transition-colors hover:border-accent-violet hover:bg-white/5"
            >
              <Mail className="h-4 w-4" />
              Get in touch
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[280px] lg:max-w-none"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-accent-violet via-accent-cyan to-accent-violet opacity-60 blur-xl animate-glow-pulse" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-background-elevated">
              <Image
                src="/headshot.jpg"
                alt={`${profile.alias} — ${profile.role}`}
                width={900}
                height={900}
                priority
                className="aspect-square w-full object-cover grayscale-[15%] contrast-[1.05]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative mt-20 border-y border-border/70 bg-background-elevated/40 py-4">
        <div className="flex w-full overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-10 whitespace-nowrap pr-10">
            {[...TECH_STRIP, ...TECH_STRIP].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="font-mono text-sm text-muted"
              >
                {tech}
                <span className="ml-10 text-accent-violet">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
