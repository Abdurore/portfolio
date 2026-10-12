/**
 * Single source of truth for the Upwork accessibility audit service.
 *
 * UPDATE HERE whenever the Upwork listing changes (price, delivery,
 * scope, URLs). The visible section, the Contact links, and the JSON-LD
 * Service in app/layout.tsx all read from this file — do not hard-code
 * the price, URLs, or deadlines anywhere else.
 */
export const audit = {
  name: "ADA & WCAG 2.1 AA accessibility audit with a PDF report",
  serviceType: "Web accessibility audit",
  description:
    "A manual WCAG 2.1 AA accessibility audit in three tiers, from one key flow or up to 3 pages (Starter) to a 10–14 page WCAG-EM sample (Advanced). Tested by hand with keyboard-only navigation and the NVDA screen reader, plus an automated scan of every page and state in scope. Delivered as a tagged, accessible PDF report with each finding mapped to the WCAG 2.1 criterion it fails, severity-ranked, with plain-language fix guidance and steps to reproduce. A sampled audit, not a full-site audit, and not a certification of legal compliance.",
  serviceUrl:
    "https://www.upwork.com/services/product/development-it-an-ada-wcag-2-1-aa-accessibility-audit-with-a-pdf-report-2108180327758331602",
  profileUrl: "https://www.upwork.com/freelancers/~0177ce94419b1c069e",
  currency: "USD",
  tiers: [
    { name: "Starter", price: 150, days: 4, scope: "up to 3 pages or 1 key flow" },
    { name: "Standard", price: 300, days: 6, scope: "up to 8 pages" },
    { name: "Advanced", price: 450, days: 7, scope: "a 10–14 page WCAG-EM sample" },
  ],
  addOn: {
    label: "NVDA screen recording of your top issues",
    price: 40,
    extraDays: 1,
  },
  revisions: 1,
  deadlinesAsOf: "2026-10-10",
  deadlines: [
    {
      label: "Public entities serving 50,000 or more people",
      date: "2027-04-26",
    },
    {
      label: "Smaller entities and special district governments",
      date: "2028-04-26",
    },
  ],
  included: [
    "A manual WCAG 2.1 AA audit of the pages or flows in your tier, chosen with you",
    "WCAG-EM sampling on the Advanced tier, so the sample is chosen deliberately rather than at random",
    "Keyboard-only testing and NVDA screen reader testing",
    "An automated scan of every page and state in scope",
    "Every finding mapped to the WCAG 2.1 criterion it fails, and severity-ranked",
    "Plain-language fix guidance and steps to reproduce for each finding",
    "A tagged, accessible PDF report",
    "A scope section stating exactly what was and wasn't tested; criteria the sample can't settle are marked “not tested”, never guessed",
    "One revision (corrections to the report)",
  ],
  notIncluded: [
    "Code fixes",
    "VPAT or ACR documents",
    "Mobile apps",
    "WCAG 2.2-only or AAA criteria",
    "Re-testing after fixes",
    "Full-site coverage",
  ],
  faq: [
    {
      question: "Is this a full-site audit?",
      answer:
        "No. It is a sample: from one key flow (Starter) up to a 10-14 page WCAG-EM sample (Advanced) that represents your site. Anything the sample can't settle is marked “not tested”.",
    },
    {
      question: "Do you fix the issues?",
      answer:
        "No. The report says what to fix and how, but code fixes aren't included.",
    },
    {
      question: "Can you certify that we comply with the ADA?",
      answer:
        "No. I report findings and conformance status for what was tested. This is not a certification of legal compliance.",
    },
    {
      question: "What do you need from me?",
      answer:
        "Send your requirements after ordering. I confirm the pages, flows, and exclusions with you before testing starts.",
    },
    {
      question: "Which standard do you test against?",
      answer:
        "WCAG 2.1 AA. WCAG 2.2-only and AAA criteria aren't included.",
    },
  ],
} as const;

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "2027-04-26" -> "April 26, 2027" (no Date parsing, so no timezone drift). */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/** "2026-10-10" -> "October 2026" */
export function formatMonthYear(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export const auditLowestPrice = Math.min(...audit.tiers.map((t) => t.price));
export const auditHighestPrice = Math.max(...audit.tiers.map((t) => t.price));
export const auditFromLabel = `from $${auditLowestPrice}`;
/** "4, 6 or 7" */
export const auditDeliveryList = audit.tiers
  .map((t) => t.days)
  .reduce((acc, d, i, all) => acc + (i === 0 ? "" : i === all.length - 1 ? " or " : ", ") + d, "");
export const auditDeliveryRange = `${audit.tiers[0].days}–${audit.tiers[audit.tiers.length - 1].days} days`;
