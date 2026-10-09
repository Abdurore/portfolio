export type Project = {
  slug: string;
  name: string;
  pitch: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  extraLinks?: { label: string; url: string }[];
  sourceUrl?: string;
  sourcePrivate?: boolean;
  category: "featured" | "practice";
  span?: "lg" | "md" | "sm";
  image?: string;
  /** Describes what the screenshot actually shows, for alt text. Required if `image` is set. */
  imageAlt?: string;
  /** "live" counts toward the "Shipped Projects" stat; the others don't. */
  status: "live" | "pre-launch" | "in-development" | "private";
};

export const projects: Project[] = [
  {
    slug: "cardora",
    name: "Cardora",
    pitch: "A WhatsApp-first digital greeting card and gifting platform for the Nigerian market — in final pre-launch testing.",
    description:
      "Co-founded and built full-stack. React + Tailwind CSS frontend with an animated card-opening experience designed around WhatsApp sharing, a Node.js backend hardened after a security audit, and Flutterwave/Paystack integration powering tiered subscriptions and in-app currency purchases. In final pre-launch testing.",
    tech: ["React", "Tailwind CSS", "Node.js", "Flutterwave", "Paystack"],
    liveUrl: "https://cardora.studio",
    sourcePrivate: true,
    category: "featured",
    span: "lg",
    image: "/projects/cardora.jpg",
    imageAlt:
      "Cardora's card-formats screen, showing five card types — Personal, Poll, Trivia, Anonymous Inbox, and Chain Cards — above a four-step how-it-works guide.",
    status: "pre-launch",
  },
  {
    slug: "euphorium",
    name: "Euphorium",
    pitch: "A social-commerce Telegram Mini App blending LinkedIn, X, and Jumia — in development for a client.",
    description:
      "Frontend/full-stack build for a client, merging professional networking, a social feed, and marketplace commerce into a single Telegram Mini App. Next.js + Tailwind CSS frontend backed by NestJS and Supabase, deployed on Render. Actively in development — no public link yet.",
    tech: ["Next.js", "Tailwind CSS", "NestJS", "Supabase"],
    sourcePrivate: true,
    category: "featured",
    status: "in-development",
  },
  {
    slug: "jaayorun",
    name: "Jaayorun",
    pitch: "A live delivery platform with dedicated vendor, user, rider, and staff apps.",
    description:
      "Collaborator on a production delivery platform spanning four dedicated apps — vendor, user, rider, and staff. Built with Laravel/PHP and Docker. Contributed bug fixes and feature development on a proprietary, closed-source codebase that's live in production.",
    tech: ["Laravel", "PHP", "Docker"],
    sourcePrivate: true,
    category: "featured",
    status: "live",
  },
  {
    slug: "hdi",
    name: "HDI",
    pitch: "Informational site for the Halal and Haram Distinction Development Initiative, with a live news feed I help keep crawlable and current.",
    description:
      "Webmaster, Super Admin, and social media manager for HDI's public site — a static HTML/CSS/JS site on cPanel consuming an existing Node/Express API built by another team (I didn't build that backend). My work: admin panel improvements (slide reordering), SEO (per-page meta, sitemap, robots, JSON-LD, making the JS-loaded news feed crawlable), ongoing content maintenance, and recovering the Instagram account. Live in production, under an ongoing engagement.",
    tech: ["HTML", "CSS", "JavaScript", "SEO"],
    liveUrl: "https://halalcert.com.ng",
    category: "featured",
    span: "md",
    image: "/projects/hdi.png",
    imageAlt:
      "HDI's homepage showing a Latest News & Updates feed and a Food & Beverage Certification service card on a green background.",
    status: "live",
  },
  {
    slug: "simplivide",
    name: "Simplivide",
    pitch: "A solo-run Science & Engineering YouTube Shorts channel, scripted like a tiny debate every time.",
    description:
      "Independent YouTube Shorts channel with a custom mascot, Bit, and a consistent debate-style format — Hook, Wrong Assumption, Destroy It, Real Explanation, Verdict. I write, record, edit, and publish every episode myself.",
    tech: ["Video Editing", "Content Strategy", "Social Media"],
    liveUrl: "https://www.youtube.com/@Simplivide",
    category: "featured",
    status: "live",
  },
  {
    slug: "kds-engineering",
    name: "KDS Engineering",
    pitch: "First website for a Lagos electrical engineering company — panels, switchgear, solar, CCTV.",
    description:
      "Built during my SIWES placement for a Nigerian electrical engineering firm. In progress: a single-file HTML prototype and a multi-page Next.js version, covering their panel-building, switchgear, solar, and CCTV work.",
    tech: ["Next.js", "HTML", "CSS"],
    category: "featured",
    status: "in-development",
  },
  {
    slug: "student-performance-prediction",
    name: "Student Performance Prediction System",
    pitch: "An ML-driven system predicting student outcomes, built for a client's final-year project.",
    description:
      "Machine learning system built for a client's final-year project — a scikit-learn model trained on student performance data, served through a React/Next.js frontend for predictions and result visualization.",
    tech: ["Python", "scikit-learn", "React", "Next.js"],
    sourcePrivate: true,
    category: "featured",
    status: "private",
  },
  {
    slug: "halal-meats",
    name: "Halal Meats",
    pitch: "A full halal meat e-commerce platform, from checkout to batch management.",
    description:
      "Next.js e-commerce platform for ordering halal meat, with an admin dashboard for managing batches and orders, and integrated payment verification/webhooks.",
    tech: ["Next.js", "React", "Tailwind CSS", "Webhooks"],
    liveUrl: "https://halal-meats.vercel.app",
    sourcePrivate: true,
    category: "featured",
    span: "md",
    image: "/projects/halal-meats.jpg",
    imageAlt:
      "Halal Meats homepage with a halal assurance badge, this week's batch availability bar, and Reserve Your Meat / Chat on WhatsApp buttons.",
    status: "live",
  },
  {
    slug: "ibro-pharmacy",
    name: "Ibro Pharmacy",
    pitch: "A full-stack pharmacy e-commerce platform — shop, prescriptions, and same-day Lagos delivery.",
    description:
      "Full-stack e-commerce platform for a Lagos pharmacy, with a Next.js frontend and an Express API hosted on Render. Shop by category with a cart and checkout flow, upload and track prescriptions, chat-style 'Ask a Pharmacist' access, and a health-tips section — all built around same-day delivery across Lagos.",
    tech: ["Next.js", "React", "Express", "Node.js", "Tailwind CSS"],
    liveUrl: "https://ibro-pharmacy.vercel.app",
    category: "featured",
    span: "md",
    image: "/projects/ibro-pharmacy.png",
    imageAlt:
      "Ibro Pharmacy's homepage hero, 'Your Health, Delivered with Care,' on a green background with a pill icon and Shop Now / Upload Prescription buttons.",
    status: "live",
  },
  {
    slug: "preventai",
    name: "PreventAI",
    pitch: "AI-scored preventive health assistant, built in 24 hours at Cavista Hackathon 2026.",
    description:
      "AI-powered preventive health assistant for adults and pregnant women. Users submit lifestyle/health data through a React form; a FastAPI backend scores risk (0-100), flags detected risks, and returns personalized prevention advice via an LLM (Groq / Llama 3.1). Built during Cavista Hackathon 2026 with team FOR_GERS.",
    tech: ["React", "FastAPI", "Groq", "Llama 3.1"],
    liveUrl: "https://cavista-real-w2eb.vercel.app",
    extraLinks: [{ label: "Live Backend", url: "https://preventai-backend.onrender.com" }],
    sourceUrl: "https://github.com/Abdurore/Cavista_real",
    category: "featured",
    span: "md",
    image: "/projects/preventai.jpg",
    imageAlt:
      "PreventAI's clinical risk summary screen, showing a low-risk score of 20, cardiovascular/metabolic/lifestyle category breakdowns, and a list of healthy-range indicators.",
    status: "live",
  },
  {
    slug: "chef-claude",
    name: "Chef Claude",
    pitch: "Tell it what's in your fridge, get back a recipe — powered server-side.",
    description:
      "AI recipe generator — enter ingredients you have on hand, and it suggests a recipe using a Hugging Face-hosted LLM. API key is kept server-side via a Vercel serverless function, never exposed to the client.",
    tech: ["React", "Vercel Functions", "Hugging Face"],
    liveUrl: "https://chef-claude-kappa-nine.vercel.app",
    sourceUrl: "https://github.com/Abdurore/chef-claude",
    category: "practice",
    image: "/projects/chef-claude.jpg",
    imageAlt:
      "Chef Claude interface listing ingredients on hand (chicken, rice, beans, pepper) and a generated recipe for a chicken and rice bowl.",
    status: "live",
  },
  {
    slug: "tenzies",
    name: "Tenzies",
    pitch: "Roll ten dice, hold your matches, race to an all-match win.",
    description:
      "A dice-rolling game built while learning React — roll ten dice, hold the ones you want to keep, and try to get them all matching in the fewest rolls.",
    tech: ["React"],
    liveUrl: "https://tenzies-game-blush-eta.vercel.app",
    sourceUrl: "https://github.com/Abdurore/tenzies-game",
    category: "practice",
    image: "/projects/tenzies.jpg",
    imageAlt: "Tenzies game board showing ten dice mid-roll with a Roll button.",
    status: "live",
  },
  {
    slug: "assembly-endgame",
    name: "Assembly: Endgame",
    pitch: "Hangman, but every wrong guess is a dying programming language.",
    description:
      "A word-guessing game (hangman-style) with a programming-languages theme — guess the word before you run out of attempts.",
    tech: ["React"],
    liveUrl: "https://assembly-endgame-liart.vercel.app",
    sourceUrl: "https://github.com/Abdurore/assembly-endgame",
    category: "practice",
    status: "live",
  },
  {
    slug: "tic-tac-toe",
    name: "Tic Tac Toe",
    pitch: "The classic two-player grid game, built with plain vanilla JS.",
    description:
      "Classic two-player tic-tac-toe, built with vanilla HTML/CSS/JS.",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://tic-tac-toe-mini-sigma.vercel.app",
    sourceUrl: "https://github.com/Abdurore/tic-tac-toe-mini",
    category: "practice",
    image: "/projects/tic-tac-toe.jpg",
    imageAlt:
      "Tic-tac-toe board mid-game with one X placed, a turn indicator, and a score tracker for Player X, Ties, and Player O.",
    status: "live",
  },
];

export const featuredProjects = projects.filter((p) => p.category === "featured");
export const practiceProjects = projects.filter((p) => p.category === "practice");
export const shippedProjectsCount = projects.filter((p) => p.status === "live").length;
