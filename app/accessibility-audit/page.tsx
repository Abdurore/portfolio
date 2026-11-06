import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Content, Section } from "@/components/Section";
import {
  audit,
  auditDeliveryList,
  auditFromLabel,
  auditHighestPrice,
  auditLowestPrice,
  formatDate,
} from "@/data/audit";
import { EMAIL, SITE_URL, profile } from "@/data/profile";
import { jsonLd, pageMetadata } from "@/lib/seo";

const PAGE_URL = `${SITE_URL}/accessibility-audit`;
const TITLE = "ADA and WCAG 2.1 AA accessibility audits";
const DESCRIPTION = `Manual WCAG 2.1 AA accessibility audits by Abdulhameed Oreagba (Abdurore): fixed-price packages ${auditFromLabel}, delivered as a tagged, accessible PDF report.`;

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/accessibility-audit",
});

// TODO(abdul): this heading must match how many audits you've actually
// completed. It is worded neutrally for now; reword once the count is known.
const OTHER_DEFECTS = [
  "A government GIS map page whose embedded map silently never loads for any visitor.",
  "A site search that returns zero results for multi-word queries.",
];

const STEPS = [
  "We agree the page and flow sample, and what's out of scope, before any testing.",
  "I run an automated scan on every page and state in scope.",
  "I test by hand with keyboard-only navigation and NVDA.",
  `You get the PDF report within your package's delivery time (${auditDeliveryList} days), plus one revision for corrections.`,
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#audit-service`,
  name: audit.name,
  serviceType: audit.serviceType,
  url: PAGE_URL,
  description: audit.description,
  provider: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: profile.name },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: audit.currency,
    lowPrice: String(auditLowestPrice),
    highPrice: String(auditHighestPrice),
    offerCount: audit.tiers.length,
    url: audit.serviceUrl,
    offers: audit.tiers.map((t) => ({
      "@type": "Offer",
      name: `${t.name}: ${t.scope}`,
      price: String(t.price),
      priceCurrency: audit.currency,
      url: audit.serviceUrl,
    })),
  },
};

export default function AccessibilityAuditPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(serviceJsonLd) }}
      />
      <Nav />
      <main id="main">
        <section aria-labelledby="audit-title" className="section !pb-0">
          <div className="shell">
            <h1 id="audit-title" className="!text-[clamp(40px,7vw,72px)]">
              ADA and WCAG 2.1 AA accessibility audits
            </h1>
            <p className="mt-3 font-serif text-2xl italic text-ink-soft">
              By {profile.name} ({profile.handle}), Lagos, Nigeria
            </p>
            <p className="mt-6">
              I audit websites against WCAG 2.1 AA by hand, with a keyboard and
              the NVDA screen reader, backed by an automated scan. Scanners miss
              many problems that only a person testing by hand will find. You
              get a severity-ranked report with fix guidance for every issue.
            </p>
            <p className="mt-4">
              It&apos;s built for agencies and dev shops shipping US
              public-sector sites, and for public bodies like schools,
              libraries, transit and water districts.
            </p>
          </div>
        </section>

        <Section id="why-now" heading="Why now">
          <Content className="mt-6">
            <p>
              The ADA Title II web rule requires WCAG 2.1 AA for US state and
              local government websites. The DOJ interim final rule published{" "}
              {audit.rule.publishedLabel} set these compliance dates:
            </p>
            <ul className="mt-4 list-disc pl-5">
              {audit.deadlines.map((d) => (
                <li key={d.date}>
                  <strong className="font-medium">{formatDate(d.date)}</strong>{" "}
                  for {d.label.charAt(0).toLowerCase() + d.label.slice(1)}.
                </li>
              ))}
            </ul>
            <p className="mt-4">
              The standard is still WCAG 2.1 AA. Read the{" "}
              <a href={audit.rule.url} className="link">
                Federal Register notice
              </a>
              . Dates can change, so check the current rule before you plan
              around them.
            </p>
          </Content>
        </Section>

        <Section id="packages" heading="Packages">
          <Content className="mt-6">
            <p>Three packages, {auditFromLabel}. Pick the one that fits your site.</p>
          </Content>
          <Content className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {audit.tiers.map((tier) => (
              <article key={tier.name} className="sheet" aria-labelledby={`tier-${tier.name}`}>
                <h3 id={`tier-${tier.name}`}>{tier.name}</h3>
                <div className="label-block mt-4">
                  <dl>
                    <dt>Price</dt>
                    <dd>${tier.price}</dd>
                    <dt>Delivery</dt>
                    <dd>{tier.days} days</dd>
                    <dt>Scope</dt>
                    <dd>{tier.scope}</dd>
                  </dl>
                </div>
              </article>
            ))}
          </Content>
          <Content className="mt-6">
            <p>
              Every package includes {audit.revisions} revision, for corrections
              to the report. Add-on: {audit.addOn.label}, +${audit.addOn.price},
              +{audit.addOn.extraDays} day. Delivery counts from when I receive
              your requirements.
            </p>
            <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <a href={audit.serviceUrl} className="btn-primary">
                View the audit service on Upwork
              </a>
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent("Question about the accessibility audit")}`}
                className="link inline-flex min-h-11 items-center"
              >
                Email a question about the audit
              </a>
            </p>
            <p className="small mt-4 text-ink-soft">
              My identity is verified by Upwork (government ID check).
            </p>
          </Content>
        </Section>

        <Section id="included" heading="What you get">
          <Content className="mt-6">
            <ul className="list-disc space-y-2 pl-5">
              {audit.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Content>
        </Section>

        <Section id="not-included" heading="What's not included">
          <Content className="mt-6">
            <ul className="list-disc space-y-2 pl-5">
              {audit.notIncluded.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-6 border-l-2 border-moss pl-4">
              I report findings and conformance status for what was tested. This
              is not a certification of legal compliance.
            </p>
          </Content>
        </Section>

        <Section id="process" heading="How it works">
          <Content className="mt-6">
            <ol className="list-decimal space-y-3 pl-5">
              {STEPS.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </Content>
        </Section>

        <Section id="other-defects" heading="Other defects I've found while auditing">
          <Content className="mt-6">
            <p>Audit work also surfaces defects that aren&apos;t WCAG failures (anonymised):</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {OTHER_DEFECTS.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="mt-4">
              To speed up the first pass I use a scanner I built with Playwright
              and axe-core (the repo is private). The manual testing and the
              report are the product.
            </p>
          </Content>
        </Section>

        <Section id="faq" heading="Questions">
          <Content className="mt-6">
            <div className="divide-y divide-rule border-y border-rule">
              {audit.faq.map((item) => (
                <details key={item.question} className="group">
                  <summary className="flex min-h-11 cursor-pointer items-center py-2 font-medium">
                    {item.question}
                  </summary>
                  <p className="pb-4">{item.answer}</p>
                </details>
              ))}
            </div>
            <p className="mt-6">
              Need something outside this scope?{" "}
              <a href={`mailto:${EMAIL}`} className="link">
                Email {EMAIL}
              </a>
              .
            </p>
          </Content>
        </Section>
      </main>
      <Footer />
    </>
  );
}
