import type { Metadata } from "next";
import { SITE_URL } from "@/data/profile";

export const HOME_TITLE =
  "Abdulhameed Oreagba (Abdurore) | Full-Stack Developer, Lagos";
export const HOME_DESCRIPTION =
  "Full-stack developer in Lagos. Lead developer on Euphorium; ships on Jaayorun, a live delivery platform. Open to remote and part-time roles.";

/**
 * Every page gets its own title, description, canonical and OG/Twitter tags.
 * og:image comes from the route's opengraph-image file, so it is not set here.
 */
export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  type = "website",
}: {
  title: string;
  /** Use the title as-is, without the " | Abdurore" suffix. */
  absoluteTitle?: boolean;
  description: string;
  path: string;
  type?: "website" | "profile";
}): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const full = absoluteTitle ? title : `${title} | Abdurore`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      title: full,
      description,
      url,
      siteName: "Abdurore",
      locale: "en_NG",
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      creator: "@abdurore",
    },
  };
}

/** JSON-LD string, safe to inline in a script tag. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
