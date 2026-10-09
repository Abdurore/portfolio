import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import {
  audit,
  auditPriceLabel,
  formatDate,
  formatMonthYear,
} from "@/data/audit";
import { Reveal } from "./Reveal";
import { GrowthLine } from "./GrowthLine";
import { LeafGlyph } from "./Botanical";

const LEAF_CUT = { borderRadius: "2rem 0.5rem 2rem 0.5rem" } as const;

const SCANNER_MISSES = [
  "A government GIS map page whose embedded map silently never loads for any visitor. Scanners reported the page as passing.",
  "A site search that returns zero results for multi-word queries. Scanners reported it as passing too.",
];

const STEPS = [
  "We agree the page and flow sample, and what's out of scope, before any testing.",
  "I run an automated scan on every page and state in scope.",
  "I test by hand with keyboard-only navigation and NVDA.",
  `You get the PDF report within ${audit.deliveryDays} days, plus one revision for corrections.`,
];

/** Static "light through leaves" decoration. Not animated, hidden from AT. */
function LightThroughLeaves() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 240 200"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      className="pointer-events-none absolute -right-6 -top-6 h-44 w-52 text-firefly opacity-30"
    >
      <path d="M150 0 L60 200" strokeWidth="1" />
      <path d="M190 0 L120 200" strokeWidth="1" />
      <path d="M230 10 L180 200" strokeWidth="1" />
      <path d="M200 40 C170 40 150 60 150 90 C180 90 200 70 200 40Z" strokeWidth="1.4" />
      <path d="M150 20 C125 25 110 45 112 70 C138 66 152 46 150 20Z" strokeWidth="1.4" />
      <path d="M235 90 C210 95 195 115 198 140 C222 135 236 115 235 90Z" strokeWidth="1.4" />
    </svg>
  );
}

function ExternalLinkText({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function Audits() {
  const [minPages, maxPages] = audit.pagesRange;

  return (
    <section
      id="audits"
      aria-labelledby="audits-heading"
      className="relative mx-auto max-w-4xl px-6 py-20"
    >
      <Reveal className="relative">
        <GrowthLine />
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          <span className="text-accent">[03]</span> Sunlight
        </p>
        <h2
          id="audits-heading"
          className="mt-3 flex items-center gap-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Accessibility audits, done by hand
          <LeafGlyph className="leaf-sprout h-5 w-5 shrink-0 text-accent" />
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Automated scanners only catch a minority of real accessibility
          problems. I test the rest myself, with a keyboard and the NVDA
          screen reader, then hand you a report you can act on.
        </p>
        <p className="mt-4 max-w-2xl text-muted">
          Who it&apos;s for: agencies and dev shops building public-sector
          sites, and public bodies like schools, libraries, transit, and
          water districts.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 max-w-2xl">
        <h3 className="font-serif text-xl font-semibold">Why now</h3>
        <p className="mt-3 leading-relaxed text-muted">
          The ADA Title II web rule requires WCAG 2.1 AA for US state and
          local government websites. {audit.deadlines[0].label} must comply
          by {formatDate(audit.deadlines[0].date)};{" "}
          {audit.deadlines[1].label.toLowerCase()} by{" "}
          {formatDate(audit.deadlines[1].date)}. That&apos;s as of{" "}
          {formatMonthYear(audit.deadlinesAsOf)}, and the dates can change,
          so check the current rule before you plan around them.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
      <div
        style={LEAF_CUT}
        className="relative overflow-hidden border border-border bg-background-elevated/60 p-6 sm:p-8"
      >
        <LightThroughLeaves />
        <h3 className="font-serif text-xl font-semibold">At a glance</h3>
        <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-muted">
              Price
            </dt>
            <dd className="mt-1 text-lg font-medium">
              {auditPriceLabel}, fixed
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-muted">
              Delivery
            </dt>
            <dd className="mt-1 text-lg font-medium">
              {audit.deliveryDays} days
              <span className="block text-sm font-normal text-muted">
                from when I receive your requirements
              </span>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-muted">
              Scope
            </dt>
            <dd className="mt-1 text-lg font-medium">
              {minPages}–{maxPages} pages or flows
              <span className="block text-sm font-normal text-muted">
                chosen with you
              </span>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-wide text-muted">
              Revisions
            </dt>
            <dd className="mt-1 text-lg font-medium">
              {audit.revisions}
              <span className="block text-sm font-normal text-muted">
                corrections to the report
              </span>
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ExternalLinkText
            href={audit.serviceUrl}
            className="inline-flex min-h-11 items-center gap-2 border border-accent bg-accent px-6 py-3 font-medium text-background transition-opacity hover:opacity-85"
          >
            View the audit service on Upwork
          </ExternalLinkText>
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent(
              "Question about the accessibility audit"
            )}`}
            className="inline-flex min-h-11 items-center gap-2 border border-border px-6 py-3 font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Ask a question first
            <span className="sr-only"> about the accessibility audit</span>
          </a>
        </div>
        <p className="mt-4 text-sm text-muted">
          My identity is verified by Upwork (government ID check).
        </p>
      </div>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Reveal className="border border-border bg-background-elevated/60 p-6">
          <h3 className="font-serif text-xl font-semibold">What you get</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted marker:text-accent">
            {audit.included.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal
          delay={0.1}
          className="border border-border bg-background-elevated/60 p-6"
        >
          <h3 className="font-serif text-xl font-semibold">
            What&apos;s not included
          </h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted marker:text-accent">
            {audit.notIncluded.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal className="mt-12 max-w-2xl">
        <h3 className="font-serif text-xl font-semibold">How it works</h3>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-muted marker:font-mono marker:text-accent">
          {STEPS.map((step) => (
            <li key={step} className="pl-1">
              {step}
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="mt-12 max-w-2xl">
        <h3 className="font-serif text-xl font-semibold">What scanners miss</h3>
        <p className="mt-3 text-muted">
          Two real defects from my Upwork profile (anonymised):
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted marker:text-accent">
          {SCANNER_MISSES.map((miss) => (
            <li key={miss}>{miss}</li>
          ))}
        </ul>
        <p className="mt-4 text-muted">
          To speed up the first pass I use a scanner I built with Playwright
          and axe-core (the repo is private). The manual testing and the
          report are the product.
        </p>
      </Reveal>

      <Reveal className="mt-12 max-w-2xl">
        <p className="border-l-2 border-accent pl-4 leading-relaxed text-muted">
          I report findings and conformance status for what was tested. This
          is not a certification of legal compliance.
        </p>
      </Reveal>

      <Reveal className="mt-12 max-w-2xl">
        <h3 className="font-serif text-xl font-semibold">Questions</h3>
        <div className="mt-4 divide-y divide-border border-y border-border">
          {audit.faq.map((item) => (
            <details key={item.question} className="group">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-3 font-medium [&::-webkit-details-marker]:hidden">
                {item.question}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="h-4 w-4 shrink-0 group-open:rotate-90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 3l5 5-5 5" />
                </svg>
              </summary>
              <p className="pb-4 leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-12 max-w-2xl">
        <p className="text-muted">
          Need something outside this scope?{" "}
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-11 items-center underline hover:text-accent"
          >
            Send me a message
          </a>
          .
        </p>
      </Reveal>
    </section>
  );
}
