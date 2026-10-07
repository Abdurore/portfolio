import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { profile, SITE_URL } from "@/data/profile";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Abdurore — Full-Stack Developer",
  description:
    "Portfolio of Abdulhameed Oreagba (Abdurore), a full-stack developer building AI-powered products and playful web experiences — creator of Cardora, Halal Meats, PreventAI, and more.",
  openGraph: {
    title: "Abdurore — Full-Stack Developer",
    description:
      "Portfolio of Abdulhameed Oreagba (Abdurore), a full-stack developer building AI-powered products and playful web experiences.",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdurore — Full-Stack Developer",
    description:
      "Portfolio of Abdulhameed Oreagba (Abdurore), a full-stack developer building AI-powered products and playful web experiences.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.alias,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  sameAs: Object.values(profile.socials),
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ScrollProgress />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
