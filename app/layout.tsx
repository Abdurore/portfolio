import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Abdurore — Frontend Developer",
  description:
    "Portfolio of Abdulhameed Oreagba (Abdurore), a frontend developer building AI-powered products and playful web experiences — creator of Cardora, Halal Meats, PreventAI, and more.",
  openGraph: {
    title: "Abdurore — Frontend Developer",
    description:
      "Portfolio of Abdulhameed Oreagba (Abdurore), a frontend developer building AI-powered products and playful web experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
