import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Accessibility statement for Abdurore's portfolio: target conformance level, what was tested and how, known limitations, and how to report a problem.",
};

const LAST_UPDATED = "7 October 2026";

export default function AccessibilityPage() {
  return (
    <>
      <Nav />
      <main id="main" className="flex flex-1 flex-col">
        <section className="mx-auto max-w-3xl px-6 py-28">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Accessibility statement
          </p>
          <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            This site aims for WCAG 2.2 AA.
          </h1>
          <p className="mt-2 font-mono text-xs text-muted">
            Last updated {LAST_UPDATED}
          </p>

          <div className="mt-10 flex flex-col gap-10 text-base leading-relaxed text-muted">
            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground">
                Target
              </h2>
              <p className="mt-3">
                This site targets{" "}
                <strong className="text-foreground">
                  WCAG 2.2 Level AA
                </strong>
                , with body text aimed at the stricter AAA contrast
                requirement (7:1) where that&apos;s achievable without
                compromising the design. It isn&apos;t certified against any
                standard — the sections below say exactly what was checked
                and how, so you can judge for yourself.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground">
                What was tested, and how
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  Automated testing with{" "}
                  <a
                    href="https://playwright.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-accent"
                  >
                    Playwright
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://github.com/dequelabs/axe-core"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-accent"
                  >
                    axe-core
                  </a>{" "}
                  (rules tagged wcag2a, wcag2aa, wcag21aa, and wcag22aa),
                  run against both the Night and Daylight themes, with
                  Still mode on and off, at mobile and desktop viewport
                  sizes.
                </li>
                <li>
                  Every text/background color pair actually used on the
                  site is checked by a small script
                  (<code className="font-mono text-sm">
                    scripts/check-contrast.mjs
                  </code>
                  ) against WCAG&apos;s contrast formula, and the production
                  build fails if any pair comes in under threshold.
                </li>
                <li>
                  A manual keyboard-only pass — tabbing through every
                  interactive element, checking focus is always visible
                  and the order makes sense, with no keyboard traps.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground">
                Known limitations
              </h2>
              <p className="mt-3">
                Automated tools and a keyboard pass catch a lot, but not
                everything. A full screen-reader pass (NVDA and VoiceOver),
                testing at 200% and 400% browser zoom, and a check in
                forced-colors/high-contrast mode are tracked as a manual
                checklist — some of that is still outstanding at the time
                of writing. This statement doesn&apos;t claim conformance beyond
                what&apos;s described above.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-foreground">
                Reporting a problem
              </h2>
              <p className="mt-3">
                If something on this site doesn&apos;t work with your assistive
                technology, or you&apos;ve hit any other accessibility barrier,
                please email{" "}
                <a
                  href={`mailto:${profile.email}`}
                  className="underline hover:text-accent"
                >
                  {profile.email}
                </a>
                . I read every email and will fix genuine issues.
              </p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
