import { Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { audit } from "@/data/audit";
import { Reveal } from "./Reveal";
import { GrowthLine } from "./GrowthLine";
import { LeafGlyph } from "./Botanical";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "./BrandIcons";

const SOCIAL_LINKS = [
  { label: "GitHub", href: profile.socials.github, icon: GithubIcon },
  { label: "LinkedIn", href: profile.socials.linkedin, icon: LinkedinIcon },
  { label: "X / Twitter", href: profile.socials.x, icon: XIcon },
  { label: "Instagram", href: profile.socials.instagram, icon: InstagramIcon },
  { label: "YouTube", href: profile.socials.youtube, icon: YoutubeIcon },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-4xl px-6 py-28 text-center"
    >
      <Reveal className="relative">
        <GrowthLine />
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          <span className="text-accent">[06]</span> Clearing
        </p>
        <h2 className="mx-auto mt-3 flex max-w-xl items-center justify-center gap-2 font-serif text-3xl font-semibold tracking-tight sm:text-5xl">
          Got an idea worth <span className="text-accent">building</span>?
          <LeafGlyph className="leaf-sprout h-5 w-5 shrink-0 text-accent" />
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted">
          I&apos;m open to full-stack roles, freelance builds, and
          collaborations. Drop a line, I read every email.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-flex min-h-11 items-center gap-2 border border-accent bg-accent px-7 py-3.5 font-medium text-background transition-opacity hover:opacity-85"
          style={{ borderRadius: "2rem 0.5rem 2rem 0.5rem" }}
        >
          <Mail className="h-4 w-4" />
          {profile.email}
        </a>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center border border-border bg-background-elevated/60 text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">
                  {label} (opens in a new tab)
                </span>
              </a>
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-col items-center gap-1 text-sm">
          <li>
            <a
              href={audit.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center underline hover:text-accent"
            >
              Upwork profile
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a
              href={audit.serviceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center underline hover:text-accent"
            >
              Order the accessibility audit
              <span className="sr-only"> (opens in a new tab on Upwork)</span>
            </a>
          </li>
        </ul>
      </Reveal>
    </section>
  );
}
