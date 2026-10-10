import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Audits } from "@/components/Audits";
import { audit, auditPriceLabel } from "@/data/audit";
import { SITE_URL } from "@/data/profile";

const URL = `${SITE_URL}/accessibility-audit`;
const TITLE = "ADA & WCAG 2.1 AA Accessibility Audit with a PDF Report";
const DESCRIPTION = `Manual ADA & WCAG 2.1 AA accessibility audit by Abdulhameed Oreagba (Abdurore): ${auditPriceLabel} fixed, delivered in ${audit.deliveryDays} days as a tagged accessible PDF report.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "accessibility audit",
    "WCAG audit",
    "WCAG 2.1 AA audit",
    "ADA accessibility audit",
    "accessibility audit PDF report",
    "Abdurore",
    "Abdulhameed Oreagba",
  ],
  alternates: { canonical: URL },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Abdurore",
    locale: "en_NG",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@abdurore",
    images: ["/opengraph-image"],
  },
};

export default function AccessibilityAuditPage() {
  return (
    <>
      <Nav />
      <main id="main" className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-[1100px] px-6 pt-28">
          <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            ADA &amp; WCAG 2.1 AA accessibility audit with a PDF report
          </h1>
          <p className="mt-3 text-muted">
            By Abdulhameed Oreagba (Abdurore), Lagos, Nigeria.
          </p>
        </div>
        <Audits />
      </main>
      <Footer />
    </>
  );
}
