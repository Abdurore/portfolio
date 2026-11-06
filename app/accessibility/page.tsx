import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { EMAIL } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Accessibility statement",
  description:
    "Accessibility statement for abdurore.tech: the WCAG 2.2 AA target, what was tested and how, the results, known limitations, and how to report a problem.",
  path: "/accessibility",
});

// Update these three together whenever the suite is re-run.
const TESTED_ON = "6 November 2026";
const RESULT_SUMMARY =
  "Zero axe-core violations on the homepage, the audits page and this page, at 390px and 1440px wide, in both themes, with the audit FAQ expanded. The keyboard pass found every control reachable in a logical order with a visible focus ring, and the page reflows without horizontal scrolling at 320px and at 200% zoom. Lighthouse scored accessibility 100 on all three pages.";

export default function AccessibilityPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section aria-labelledby="statement-title" className="section">
          <div className="shell">
            <h1 id="statement-title" className="!text-[clamp(40px,7vw,72px)]">
              Accessibility statement
            </h1>
            <p className="mt-3 text-ink-soft">Last tested {TESTED_ON}</p>

            <div className="mt-10 flex flex-col gap-10">
              <section aria-labelledby="target">
                <h2 id="target">Target</h2>
                <p className="mt-3">
                  This site targets WCAG 2.2 Level AA. I sell WCAG audits, so I
                  hold this site to the standard I audit against. No third party
                  has assessed it. The sections below say exactly what was
                  checked and how, so you can judge for yourself.
                </p>
              </section>

              <section aria-labelledby="results">
                <h2 id="results">Latest result</h2>
                <p className="mt-3">{RESULT_SUMMARY}</p>
              </section>

              <section aria-labelledby="how">
                <h2 id="how">What was tested, and how</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>
                    Automated scans with Playwright and axe-core (rules tagged
                    wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa and
                    best-practice) on every page, at 390px and 1440px wide, in
                    both the light and Night Still themes.
                  </li>
                  <li>
                    Reflow at 320px and at 200% zoom, the WCAG text-spacing
                    overrides, and a Lighthouse audit of each page.
                  </li>
                  <li>
                    A script checks every text and background colour pair, and
                    every control boundary, against the WCAG contrast formula in
                    both themes. The production build fails if any pair falls
                    below 4.5:1 for text or 3:1 for large text and boundaries.
                  </li>
                  <li>
                    A manual keyboard pass through the whole homepage: tab order,
                    visible focus, the mobile menu (Escape closes it and returns
                    focus to its button), and no keyboard traps.
                  </li>
                  <li>
                    Reduced motion is respected. The only animation is a short
                    settle-in of the portrait on first load, and it is instant
                    under prefers-reduced-motion. Nothing moves on its own
                    afterwards.
                  </li>
                </ul>
              </section>

              <section aria-labelledby="limits">
                <h2 id="limits">Known limitations</h2>
                <p className="mt-3">
                  Automated tools and a keyboard pass catch a lot, but not
                  everything. A full screen-reader pass with NVDA and VoiceOver,
                  testing at 200% and 400% zoom, and a check in forced-colors
                  mode are tracked as a manual checklist, and some of that is
                  still outstanding. This statement doesn&apos;t claim
                  conformance beyond what is described above.
                </p>
              </section>

              <section aria-labelledby="report">
                <h2 id="report">Reporting a problem</h2>
                <p className="mt-3">
                  If something on this site doesn&apos;t work with your assistive
                  technology, or you&apos;ve hit any other barrier, email{" "}
                  <a href={`mailto:${EMAIL}`} className="link">
                    {EMAIL}
                  </a>
                  . I read every message and will fix genuine issues.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
