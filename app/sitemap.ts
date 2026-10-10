import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/profile";

// Fixed dates (bump when a page's content changes) so crawlers aren't told
// everything changed on every build.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-10-10"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/accessibility-audit`,
      lastModified: new Date("2026-10-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/accessibility`,
      lastModified: new Date("2026-10-07"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
