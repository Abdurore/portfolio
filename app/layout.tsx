import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { profile, SITE_URL } from "@/data/profile";
import { projects } from "@/data/projects";
import { audit } from "@/data/audit";
import { ScrollProgress } from "@/components/ScrollProgress";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "Abdurore (Abdulhameed Oreagba) — Full-Stack Developer in Lagos, Nigeria";
const DESCRIPTION =
  "Abdurore (Abdulhameed Oreagba) is a full-stack developer and Mechatronics student in Lagos, Nigeria, building web products, e-commerce platforms, and accessible experiences.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Abdurore",
  },
  description: DESCRIPTION,
  applicationName: "Abdurore",
  authors: [{ name: "Abdulhameed Oreagba", url: SITE_URL }],
  creator: "Abdulhameed Oreagba",
  publisher: "Abdulhameed Oreagba",
  keywords: [
    "Abdurore",
    "Abdulhameed Oreagba",
    "Oreagba Abdulhameed",
    "full-stack developer Lagos",
    "Next.js developer Nigeria",
    "Mechatronics Engineering LASUSTECH",
    "web developer portfolio",
    "React developer Lagos",
    "accessibility audit",
    "WCAG audit",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "profile",
    firstName: "Abdulhameed",
    lastName: "Oreagba",
    username: profile.alias,
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0d09" },
    { media: "(prefers-color-scheme: light)", color: "#f3f1e7" },
  ],
};

// Public = linkable: anything with a live URL. Keeps the structured data
// honest instead of listing in-development/private work as if visitable.
const publicProjects = projects.filter((p) => p.liveUrl);

const personId = `${SITE_URL}/#person`;
const websiteId = `${SITE_URL}/#website`;
const profilePageId = `${SITE_URL}/#profilepage`;

const personJsonLd = {
  "@type": "Person",
  "@id": personId,
  name: "Abdulhameed Oreagba",
  alternateName: [
    "Abdurore",
    "abdurore",
    "Oreagba Abdulhameed",
    "Oreagba Abdulhameed Oluwadurotimi",
  ],
  url: SITE_URL,
  image: `${SITE_URL}/headshot-v5.jpg`,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: profile.education.school,
  },
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: profile.education.school,
  },
  knowsAbout: profile.skillGroups.flatMap((g) => g.skills),
  sameAs: Object.values(profile.socials),
};

const websiteJsonLd = {
  "@type": "WebSite",
  "@id": websiteId,
  url: SITE_URL,
  name: "Abdurore",
  description: DESCRIPTION,
  publisher: { "@id": personId },
};

const profilePageJsonLd = {
  "@type": "ProfilePage",
  "@id": profilePageId,
  url: SITE_URL,
  name: TITLE,
  isPartOf: { "@id": websiteId },
  mainEntity: { "@id": personId },
};

const projectsItemListJsonLd = {
  "@type": "ItemList",
  "@id": `${SITE_URL}/#projects`,
  name: "Projects by Abdurore",
  itemListElement: publicProjects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type":
        project.tech.includes("Video Editing") ? "CreativeWork" : "SoftwareApplication",
      name: project.name,
      description: project.pitch,
      url: project.liveUrl,
      creator: { "@id": personId },
    },
  })),
};

const serviceJsonLd = {
  "@type": "Service",
  "@id": `${SITE_URL}/#audit-service`,
  name: audit.name,
  serviceType: audit.serviceType,
  description: audit.description,
  provider: { "@id": personId },
  offers: {
    "@type": "Offer",
    price: String(audit.price),
    priceCurrency: audit.currency,
    url: audit.serviceUrl,
  },
};

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    personJsonLd,
    websiteJsonLd,
    profilePageJsonLd,
    projectsItemListJsonLd,
    serviceJsonLd,
  ],
};

// Runs before hydration so the saved theme/still-mode preference applies
// with no flash of the wrong theme or motion.
const themeInitScript = `
(function () {
  try {
    var theme = localStorage.getItem("theme");
    if (theme === "light" || theme === "dark") {
      document.documentElement.setAttribute("data-theme", theme);
    }
    var still = localStorage.getItem("stillMode");
    if (still === "true") {
      document.documentElement.setAttribute("data-still", "true");
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
        <ScrollProgress />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
