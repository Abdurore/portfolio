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
    "A manual WCAG 2.1 AA accessibility audit of 10–14 pages or key flows, chosen with the client using WCAG-EM sampling. Tested by hand with keyboard-only navigation and the NVDA screen reader, plus an automated scan of every page and state in scope. Delivered as a tagged, accessible PDF report with each finding mapped to the WCAG 2.1 criterion it fails, severity-ranked, with plain-language fix guidance. A sampled audit, not a full-site audit, and not a certification of legal compliance.",
  serviceUrl:
    "https://www.upwork.com/services/product/development-it-an-ada-wcag-2-1-aa-accessibility-audit-with-a-pdf-report-2108180327758331602",
  profileUrl: "https://www.upwork.com/freelancers/~0177ce94419b1c069e",
  price: 450,
  currency: "USD",
  deliveryDays: 7,
  pagesRange: [10, 14] as const,
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
    "A manual WCAG 2.1 AA audit of 10–14 pages or key flows, chosen with you",
    "WCAG-EM sampling, so the sample is chosen deliberately rather than at random",
    "Keyboard-only testing and NVDA screen reader testing",
    "An automated scan of every page and state in scope",
    "A tagged, accessible PDF report",
    "Every finding mapped to the WCAG 2.1 criterion it fails, and severity-ranked",
    "Plain-language fix guidance for each failed criterion",
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
        "No. It's a sampled audit of 10–14 pages or states. Anything the sample can't settle is marked “not tested” in the report.",
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

export const auditPriceLabel = `$${audit.price}`;
