"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Magnetic } from "./Magnetic";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center bg-grid pt-24"
    >
      <div className="relative mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex w-fit items-center gap-2 border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-muted"
          >
            <span className="h-2 w-2 bg-accent" />
            Status: Available for full-stack work
            <span className="text-accent animate-blink">_</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl"
          >
            Hi, I&apos;m <span className="text-accent">{profile.alias}</span>
            <br />
            <span className="font-mono">Full-Stack Developer</span>
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
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href="#featured"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("featured")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-2 border border-accent bg-accent px-6 py-3 font-mono text-sm font-medium text-background transition-opacity hover:opacity-85"
              >
                View Projects
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 border border-border px-6 py-3 font-mono text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <Mail className="h-4 w-4" />
                Get in touch
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 border border-border px-6 py-3 font-mono text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </Magnetic>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 font-mono text-xs text-muted"
          >
            {profile.role} / {profile.subrole} / {profile.location}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="corner-brackets relative mx-auto w-full max-w-[280px] border border-border bg-background-elevated lg:max-w-none"
        >
          <Image
            src="/headshot-v4.jpg"
            alt={`${profile.alias} — ${profile.role}`}
            width={900}
            height={900}
            priority
            className="aspect-square w-full object-cover object-[50%_32%] brightness-125 contrast-[1.08] saturate-[1.05]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
