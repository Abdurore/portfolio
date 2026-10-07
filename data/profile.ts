import { shippedProjectsCount } from "./projects";

export const SITE_URL = "https://abdurore-dev.vercel.app";

export const profile = {
  name: "Oreagba Abdulhameed Oluwadurotimi",
  alias: "Abdurore",
  role: "Full-Stack Developer",
  subrole: "Mechatronics Engineering Student",
  tagline:
    "Full-Stack Developer building AI-powered products and playful web experiences.",
  heroLead:
    "Most people call me Abdurore. I'm a full-stack developer in Lagos who builds whole things, from the interface to the deploy, and I try to build the way good things grow: roots first, patiently, on purpose.",
  bio: "I'm a third-year Mechatronics Engineering student at LASUSTECH, and I've been building for the web for 2+ years. I like making things that are useful to real people: a greeting-card platform for Nigerians who live on WhatsApp, a site for a halal certification body, a pharmacy that delivers same-day across Lagos. Away from the screen I'm happiest around trees, plants, and green things that take their time.",
  location: "Lagos, Nigeria",
  email: "abdulhamidore1@gmail.com",
  resumeUrl: "/Abdurore-CV.pdf",
  education: {
    school: "Lagos State University of Science and Technology (LASUSTECH)",
    degree: "B.Eng. Mechatronics Engineering",
    status: "Third Year (In Progress)",
  },
  stats: [
    { label: "Years Building", value: "2+" },
    { label: "Shipped Projects", value: String(shippedProjectsCount) },
    { label: "Co-Founded", value: "1" },
  ],
  skillGroups: [
    {
      label: "Languages & Frameworks",
      skills: [
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "JavaScript",
        "Python",
        "Laravel / PHP",
        "FastAPI",
        "Express",
      ],
    },
    {
      label: "Backend & Data",
      skills: ["MongoDB", "Supabase", "NestJS", "scikit-learn", "Docker"],
    },
    {
      label: "Tools & Workflow",
      skills: [
        "Tailwind CSS",
        "HTML / CSS",
        "Git / GitHub",
        "Figma",
        "Vercel / Netlify",
        "Design Tokens / CSS Custom Properties",
        "AI Prompt Engineering",
        "AutoCAD",
        "Playwright / axe-core",
      ],
    },
    {
      label: "Content & Accessibility",
      skills: [
        "Video Editing",
        "Social Media Management",
        "SEO",
        "Accessibility (WCAG)",
      ],
    },
  ],
  credentials: [
    { name: "Anthropic Claude 101", status: "earned" as const },
    {
      name: "Anthropic AI Fluency",
      status: "earned" as const,
      // TODO: add the public credential/badge URL once available
      url: undefined as string | undefined,
    },
    {
      name: "DHS Trusted Tester",
      status: "in-progress" as const,
    },
  ],
  experience: [
    {
      title: "BoyCode Bootcamp 5.0",
      org: "Stellar Initiative",
      period: "June 2026",
      description:
        "Residential bootcamp in Lagos — competitive admission, fully funded.",
    },
    {
      title: "Cavista Hackathon 2026",
      org: "Team FOR_GERS",
      period: "2026",
      description:
        "Built PreventAI, an AI-scored preventive health assistant, in 24 hours.",
    },
    {
      title: "SIWES Placement",
      org: "Engineering firm, Lagos",
      period: "",
      description:
        "Industrial control panel work; built the firm's first website (KDS Engineering) alongside it.",
    },
    {
      title: "AutoCAD Internship",
      org: "Architectural firm, Lagos",
      period: "",
      description: "Technical drafting and design support.",
    },
    {
      title: "Webmaster & Super Admin",
      org: "Halal and Haram Distinction Development Initiative (HDI)",
      period: "Aug 2026 – Jan 2027",
      description:
        "Ongoing: site maintenance, SEO, social media, and admin panel improvements.",
    },
    {
      title: "Freelance Full-Stack Development",
      org: "Upwork & DataAnnotation",
      period: "Jan 2026 – present",
      description: "Client web development and data/AI evaluation work.",
    },
  ],
  socials: {
    github: "https://github.com/abdurore",
    linkedin: "https://linkedin.com/in/abdurore",
    x: "https://x.com/abdurore",
    instagram: "https://instagram.com/abdurore",
    youtube: "https://www.youtube.com/@Simplivide",
  },
} as const;
