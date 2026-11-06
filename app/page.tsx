import type { Metadata } from "next";
import { About } from "@/components/About";
import { AuditsTeaser } from "@/components/AuditsTeaser";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Work } from "@/components/Work";
import { SITE_URL, profile } from "@/data/profile";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  jsonLd,
  pageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: HOME_TITLE,
  absoluteTitle: true,
  description: HOME_DESCRIPTION,
  path: "/",
  type: "profile",
});

const personId = `${SITE_URL}/#person`;
const websiteId = `${SITE_URL}/#website`;

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      alternateName: [profile.handle, profile.legalName],
      jobTitle: profile.role,
      url: SITE_URL,
      image: `${SITE_URL}/headshot-v5.jpg`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lagos",
        addressCountry: "NG",
      },
      knowsAbout: profile.skillGroups.flatMap((g) => g.skills),
      sameAs: profile.socials.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: SITE_URL,
      name: "Abdurore",
      description: HOME_DESCRIPTION,
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: HOME_TITLE,
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(graph) }}
      />
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <Experience />
        <AuditsTeaser />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
