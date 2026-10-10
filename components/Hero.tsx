import Image from "next/image";
import { ArrowDown, Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";
import { Fireflies } from "./Fireflies";
import { Fern, PalmFrond } from "./Botanical";

export function Hero() {
  return (
    <section
      id="hero"
      className="canopy-glow relative flex min-h-screen flex-col justify-center overflow-hidden pt-24"
    >
      {/* Hidden SVG defs: the leaf clip-path the headshot is masked into. */}
      <svg width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="leaf-clip" clipPathUnits="objectBoundingBox">
            <path d="M0.5,0.02 C0.75,0.08 0.95,0.28 0.92,0.5 C0.9,0.72 0.78,0.9 0.55,0.98 C0.5,1 0.45,0.97 0.4,0.9 C0.2,0.8 0.05,0.6 0.08,0.4 C0.12,0.18 0.3,0.05 0.5,0.02 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Foliage spilling in from the top-right corner, behind the content. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-8 hidden text-fern sm:block"
      >
        <PalmFrond className="foliage-sway h-[26rem] w-[26rem] rotate-[24deg] opacity-[0.16]" />
        <PalmFrond
          className="foliage-sway absolute -left-24 top-16 h-[22rem] w-[22rem] -scale-x-100 rotate-[-8deg] opacity-[0.1]"
          style={{ animationDelay: "-3s" }}
        />
      </div>
      <Fern
        aria-hidden="true"
        className="foliage-sway pointer-events-none absolute -bottom-6 -left-6 hidden h-72 w-48 rotate-[-12deg] text-fern opacity-[0.12] sm:block"
        style={{ transformOrigin: "50% 100%", animationDelay: "-1.5s" }}
      />
      <Fireflies />

      <div className="relative mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col">
          <Reveal className="mb-5 inline-flex w-fit items-center gap-2 border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-muted">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Status: Available for full-stack work
            <span className="text-firefly animate-blink">●</span>
          </Reveal>

          <Reveal
            delay={0.1}
            className="relative font-serif text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl"
          >
            <h1>
              {profile.commonName}{" "}
              <span className="text-accent">({profile.alias})</span>
            </h1>
          </Reveal>

          <Reveal
            delay={0.2}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            <p>{profile.heroLead}</p>
          </Reveal>

          <Reveal
            delay={0.3}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#featured"
              className="group inline-flex min-h-11 items-center gap-2 border border-accent bg-accent px-6 py-3 font-medium text-background transition-opacity hover:opacity-85"
              style={{ borderRadius: "2rem 0.5rem 2rem 0.5rem" }}
            >
              View Projects
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-11 items-center gap-2 border border-border px-6 py-3 font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              style={{ borderRadius: "2rem 0.5rem 2rem 0.5rem" }}
            >
              <Mail className="h-4 w-4" />
              Get in touch
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex min-h-11 items-center gap-2 border border-border px-6 py-3 font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              style={{ borderRadius: "2rem 0.5rem 2rem 0.5rem" }}
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
          </Reveal>

          <Reveal delay={0.35} className="mt-4">
            <a
              href="#audits"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm text-muted underline underline-offset-4 hover:text-accent"
            >
              Also offering WCAG accessibility audits
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>

          <Reveal delay={0.4} className="mt-6 font-mono text-xs text-muted">
            <p>
              {profile.role} / {profile.subrole} / {profile.location}
            </p>
          </Reveal>
        </div>

        <Reveal
          delay={0.15}
          className="relative mx-auto aspect-[0.9/1] w-full max-w-[320px] lg:max-w-[380px]"
        >
          {/* Offset leaf outline + midrib behind the photo, like a leaf's shadow. */}
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            className="absolute inset-0 h-full w-full translate-x-3 translate-y-3 text-fern"
          >
            <path
              d="M50,2 C75,8 95,28 92,50 C90,72 78,90 55,98 C50,100 45,97 40,90 C20,80 5,60 8,40 C12,18 30,5 50,2 Z"
              stroke="currentColor"
              strokeOpacity=".55"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M52,98 C50,70 52,40 50,2"
              stroke="currentColor"
              strokeOpacity=".25"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <div
            className="relative h-full w-full bg-background-elevated"
            style={{ clipPath: "url(#leaf-clip)" }}
          >
            <Image
              src="/headshot-v5.jpg"
              alt={`${profile.name}, known as ${profile.alias}, smiling slightly in a plain portrait photo`}
              width={960}
              height={1280}
              priority
              sizes="(min-width: 1024px) 380px, 320px"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
