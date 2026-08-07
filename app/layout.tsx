import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile, SITE_URL } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Abdurore — Frontend Developer",
  description:
    "Portfolio of Abdulhameed Oreagba (Abdurore), a frontend developer building AI-powered products and playful web experiences — creator of Cardora, Halal Meats, PreventAI, and more.",
  openGraph: {
    title: "Abdurore — Frontend Developer",
    description:
      "Portfolio of Abdulhameed Oreagba (Abdurore), a frontend developer building AI-powered products and playful web experiences.",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdurore — Frontend Developer",
    description:
      "Portfolio of Abdulhameed Oreagba (Abdurore), a frontend developer building AI-powered products and playful web experiences.",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
