import { audit } from "./audit";

export const SITE_URL = "https://abdurore.tech";

/**
 * The one place the contact address lives. Change it here and every link,
 * label and the footer follow.
 * TODO(abdul): confirm a test email to hello@ arrives before deploying.
 * Also turn off Cloudflare's Email Address Obfuscation for this site, or it
 * replaces the visible address with "[email protected]".
 */
export const EMAIL = "hello@abdurore.tech";

export const profile = {
  /** Visible name, everywhere. */
  name: "Abdulhameed Oreagba",
  handle: "Abdurore",
  /** Full legal name: JSON-LD alternateName only. Never shown on the page. */
  legalName: "Oreagba Abdulhameed Oluwadurotimi",
  role: "Full-Stack Developer",
  location: "Lagos, NG",
  resumeUrl: "/Abdurore-CV.pdf",
  lede: "Full-stack developer in Lagos. I'm the lead developer on Euphorium, a campus commerce app, and I ship fixes and features on Jaayorun, a live delivery platform.",
  specimen: [
    { key: "Based in", value: "Lagos, Nigeria (WAT, UTC+1)" },
    {
      key: "Open to",
      value: "remote roles, or hybrid in Lagos; part-time or contract",
    },
    {
      key: "Studying",
      value: "B.Eng. Mechatronics Engineering, LASUSTECH, graduating 2028",
    },
  ],
  skillGroups: [
    {
      label: "Front end",
      skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
    },
    {
      label: "Back end",
      skills: ["Node.js", "Express", "NestJS", "Laravel/PHP", "FastAPI"],
    },
    { label: "Data", skills: ["PostgreSQL (Supabase)", "MongoDB"] },
    {
      label: "Infrastructure",
      skills: ["Docker", "Cloudflare", "DigitalOcean", "Vercel", "Git"],
    },
    {
      label: "Accessibility",
      skills: [
        "WCAG 2.1 AA",
        "NVDA",
        "keyboard testing",
        "Playwright with axe-core",
      ],
    },
    { label: "Machine learning", skills: ["Python", "scikit-learn"] },
  ],
  credentials: [
    "Anthropic: Claude 101",
    "Anthropic: AI Fluency",
    // Keep "(in progress)" attached: scripts/check-jsonld.mjs fails the build
    // on any other use of "Trusted Tester".
    "DHS Trusted Tester (in progress)",
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/abdurore" },
    { label: "LinkedIn", href: "https://linkedin.com/in/abdurore" },
    { label: "X", href: "https://x.com/abdurore" },
    { label: "Instagram", href: "https://instagram.com/abdurore" },
    { label: "Upwork", href: audit.profileUrl },
    { label: "YouTube (Simplivide)", href: "https://www.youtube.com/@Simplivide" },
  ],
} as const;

export type ExperienceEntry = {
  title: string;
  /** Shown in its own element, never joined to the title with a dot. */
  org?: string;
  dates: string;
  note?: string;
  description: string;
  link?: { label: string; href: string };
};

/** Newest first. */
export const experience: ExperienceEntry[] = [
  {
    // TODO(abdul): start month for Corbel.
    title: "Co-founder, Corbel",
    dates: "2026 – present",
    description:
      "Corbel builds secure software for African infrastructure and regulated industries. Our first product, Coffer, is an evidence vault for telecom field teams: they upload site photos on weak connections, track what's missing against each client's checklist, and assemble the closeout pack. We're building it now with contractors.",
    link: { label: "corbel.ng", href: "https://corbel.ng" },
  },
  {
    // TODO(abdul): start month for Euphorium.
    title: "Lead developer, Euphorium",
    dates: "Present",
    description: "Built most of the platform. See Selected work.",
  },
  {
    title: "Developer, Jaayorun",
    dates: "Aug 2026 – present",
    description:
      "Production bug fixes and features across vendor, customer, rider and staff apps; taking over day-to-day ownership.",
  },
  {
    title: "Webmaster and super admin, HDI",
    dates: "Aug 2026 – Jan 2027",
    note: "Contract",
    description:
      "I run the website and portals for a halal certification body: rewrote the news content, fixed broken media, moved inline styles into one maintainable stylesheet, and look after SEO.",
    link: { label: "halalcert.com.ng", href: "https://halalcert.com.ng" },
  },
  {
    title: "Freelance full-stack developer",
    dates: "Jan 2026 – present",
    description:
      "Client work through Upwork, AI evaluation work through DataAnnotation, and manual WCAG accessibility audits.",
  },
  {
    title: "Cavista Hackathon 2026",
    org: "Team FOR_GERS",
    dates: "2026",
    description: "Built PreventAI in 24 hours.",
  },
  {
    title: "BoyCode Bootcamp 5.0",
    dates: "Jun 2026",
    description:
      "A fully funded residential programme in Lagos run by Stellar Initiative. I'm now in its AI and automation cohort.",
  },
  {
    title: "Engineering placements",
    dates: "2026",
    description:
      "SIWES at KDS Engineering (Jul–Oct 2026), working on industrial control panels, and an AutoCAD drafting internship at a Lagos architecture firm.",
  },
];
