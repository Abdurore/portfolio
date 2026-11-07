export type ProjectLink = { label: string; href: string };

export type ProjectImage = { src: string; width: number; height: number; alt: string };

export type Project = {
  slug: string;
  name: string;
  /** Role on the project. null means unknown: a TODO is open in this file. */
  role: string | null;
  builtWith: string[];
  status: string;
  /** Linked destinations. Link text always names where it goes. */
  links: ProjectLink[];
  /** Plain-text note shown in the Links row when there is nothing to open. */
  linksNote?: string;
  description: string;
  architecture?: string;
  /** One landscape screenshot. */
  image?: ProjectImage;
  /** Portrait phone screenshots, shown side by side. Needs every file to
   *  exist in /public; until then the sheet has no image area. */
  portraitImages?: ProjectImage[];
  /** Layout at >=1024px: "wide" is a full-width sheet with the image in the
   *  left 5 columns and the text and label in the right 7. */
  layout?: "wide";
};

export const projects: Project[] = [
  {
    slug: "euphorium",
    name: "Euphorium",
    role: "Lead developer",
    builtWith: [
      "Next.js",
      "Tailwind CSS",
      "NestJS",
      "PostgreSQL (Supabase)",
      "Cloudflare",
      "DigitalOcean",
    ],
    status: "Live and growing",
    links: [
      { label: "Open the Euphorium app", href: "https://euphorium.app" },
      { label: "Visit euphorium.me", href: "https://euphorium.me" },
    ],
    // It is a normal web app now, not a Telegram Mini App.
    description:
      "A social-commerce app for students, where each campus is its own marketplace. Young people sell what they make or know, post to a shared feed, and message buyers. I built most of it, front end to back end: storefronts, the feed, messaging, search, and tiered seller verification with a step-by-step check for orders above ₦30,000. I also built Lockbox, a payment hold, and the five-minute window sellers get to edit a new listing.",
    architecture:
      "NestJS modular monolith on DigitalOcean, Supabase Postgres, and Cloudflare for DNS, CDN and R2 image storage.",
    // Two cropped phone screenshots of euphorium.app.
    portraitImages: [
      {
        src: "/projects/euphorium-1.png",
        width: 474,
        height: 882,
        alt: "The Euphorium feed on a phone, in the light theme: stories, a search bar, For You and Trending tabs, category chips and a sponsored post.",
      },
      {
        src: "/projects/euphorium-2.png",
        width: 474,
        height: 1237,
        alt: "The Euphorium Sell an Item form on a phone, filled in with a sample listing: photos, title, description, category, condition, availability, price, stock and optional specs, a notice about editing a listing after posting, and a List Item button.",
      },
    ],
  },
  {
    slug: "jaayorun",
    name: "Jaayorun",
    role: "Developer",
    builtWith: ["Laravel", "PHP", "Docker"],
    status: "Live in production",
    // Checked: jaayorun.com returned 200 on 2026-11-07.
    links: [{ label: "Visit jaayorun.com", href: "https://jaayorun.com" }],
    linksNote: "Code is private",
    description:
      "A delivery platform with four connected apps for vendors, customers, riders and staff. I fix production bugs and ship features across all four in a Dockerised Laravel codebase, and I'm taking over day-to-day ownership from the lead developer.",
    // No screenshot exists: the sheet draws the JaayorunPlate diagram instead.
  },
  {
    slug: "cardora",
    name: "Cardora",
    role: "Full-stack developer",
    builtWith: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Docker",
      "Flutterwave",
      "Paystack",
    ],
    status: "Paused before launch",
    // Checked: cardora.studio returned 200 on 2026-11-06.
    links: [{ label: "Open the Cardora demo", href: "https://cardora.studio" }],
    description:
      "A WhatsApp-first greeting card and gifting platform for Nigeria. I built the React front end, including the animated envelope-to-card opening that recipients see, and worked on the Node.js backend: three subscription tiers, an in-app currency, and payments through Flutterwave and Paystack.",
    image: {
      src: "/projects/cardora.jpg",
      width: 1200,
      height: 653,
      alt: "Cardora's card-formats screen, showing five card types (Personal, Poll, Trivia, Anonymous Inbox, and Chain Cards) above a four-step how-it-works guide.",
    },
  },
  {
    slug: "preventai",
    name: "PreventAI",
    // Role supplied by Abdul in chat, not from repo data.
    role: "Full-stack developer",
    builtWith: ["React", "FastAPI", "Groq", "Llama 3.1"],
    status: "Built in 24 hours at Cavista Hackathon 2026. Demo offline.",
    // TODO(abdul): restore the demo links when the backend is back
    // ("Open the PreventAI demo" -> https://cavista-real-w2eb.vercel.app and
    // "Open the PreventAI backend" -> https://preventai-backend.onrender.com;
    // Render answers 503 "suspend-by-user", checked 2026-11-06), and flip
    // Status back to "Live".
    links: [
      {
        label: "Read the PreventAI source on GitHub",
        href: "https://github.com/Abdurore/Cavista_real",
      },
    ],
    description:
      "A preventive-health assistant. It scores a user's risk from a short health profile and returns plain-language advice generated by Llama 3.1.",
    image: {
      src: "/projects/preventai.jpg",
      width: 1200,
      height: 698,
      alt: "PreventAI's clinical risk summary screen, showing a low-risk score of 20, cardiovascular, metabolic and lifestyle category breakdowns, and a list of healthy-range indicators.",
    },
  },
  {
    slug: "halal-meats",
    name: "Halal Meats",
    role: "Solo designer and developer",
    layout: "wide",
    builtWith: ["Next.js", "React", "Tailwind CSS"],
    status: "Live",
    links: [
      {
        label: "Open the Halal Meats store",
        href: "https://halal-meats.vercel.app",
      },
    ],
    description:
      "An e-commerce store for halal meat, with checkout, payment webhooks, and an admin for managing stock in batches.",
    image: {
      src: "/projects/halal-meats.jpg",
      width: 1200,
      height: 774,
      alt: "The Halal Meats homepage, with a halal assurance badge, this week's batch availability bar, and Reserve Your Meat and Chat on WhatsApp buttons.",
    },
  },
];

export const alsoBuilt = {
  name: "Student Performance Prediction System",
  description:
    "A commissioned machine-learning system that flags students at risk of falling behind, with a React and Next.js dashboard.",
  builtWith: ["Python", "scikit-learn"],
  note: "Code private",
};
