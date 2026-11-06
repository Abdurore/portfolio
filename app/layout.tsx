import type { Metadata, Viewport } from "next";
import { Amiri, Petrona, Schibsted_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "@/data/profile";
import "./globals.css";

// Headings: Petrona, variable, with italics for the botanical margin labels.
const petrona = Petrona({
  variable: "--font-petrona",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

// Body and UI: Schibsted Grotesk, variable.
const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

// Used only for the Arabic motto in the footer.
const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: "400",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Abdulhameed Oreagba (Abdurore)", template: "%s | Abdurore" },
  applicationName: "Abdurore",
  authors: [{ name: "Abdulhameed Oreagba", url: SITE_URL }],
  creator: "Abdulhameed Oreagba",
  publisher: "Abdulhameed Oreagba",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef0e5" },
    { media: "(prefers-color-scheme: dark)", color: "#18221c" },
  ],
};

// Runs before first paint so there is no flash of the wrong theme.
// Reads and writes of localStorage are wrapped: it can throw (private mode).
const themeInitScript = `
(function () {
  var theme = null;
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") theme = saved;
  } catch (e) {}
  if (!theme) {
    try {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch (e) {
      theme = "light";
    }
  }
  document.documentElement.setAttribute("data-theme", theme);
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${petrona.variable} ${schibsted.variable} ${amiri.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
