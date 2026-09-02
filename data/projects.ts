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
};

export const projects: Project[] = [
  {
    slug: "cardora",
    name: "Cardora",
    pitch: "Animated digital greeting cards with tiered subscriptions and an in-app currency — pre-launch, wrapping up the payment flow.",
    description:
      "Co-founded and built full-stack. React + Tailwind CSS frontend with an animated card-opening experience, a Node.js backend, and Flutterwave/Paystack integration powering tiered subscriptions and in-app currency purchases. Currently pre-launch, in final bug fixes on the payment flow.",
    tech: ["React", "Tailwind CSS", "Node.js", "Flutterwave", "Paystack"],
    liveUrl: "https://cardora.studio",
    sourcePrivate: true,
    category: "featured",
    span: "lg",
    image: "/projects/cardora.jpg",
  },
  {
    slug: "euphorium",
    name: "Euphorium",
    pitch: "A social-commerce Telegram Mini App blending LinkedIn, X, and Jumia — in development for a client.",
    description:
      "Frontend/full-stack build for a client, merging professional networking, a social feed, and marketplace commerce into a single Telegram Mini App. Next.js + Tailwind CSS frontend backed by NestJS and Supabase, deployed on Cloudflare. Actively in development — no public link yet.",
    tech: ["Next.js", "Tailwind CSS", "NestJS", "Supabase", "Cloudflare"],
    sourcePrivate: true,
    category: "featured",
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
  },
  {
    slug: "hdi",
    name: "HDI",
    pitch: "Informational site for the Halal and Haram Distinction Development Initiative, with a live news feed.",
    description:
      "Webmaster and Super Admin for HDI's public site. Built with HTML/CSS and a Node.js/Express API backed by MongoDB, powering a live news feed. Live in production, under an ongoing maintenance contract.",
    tech: ["HTML", "CSS", "Node.js", "Express", "MongoDB"],
    liveUrl: "https://halalcert.com.ng",
    category: "featured",
    span: "md",
    image: "/projects/hdi.png",
  },
  {
    slug: "accessibility-audit-scanner",
    name: "Accessibility Audit Scanner",
    pitch: "An internal WCAG/ADA compliance scanner powering a solo audit service.",
    description:
      "Internal tool built with Playwright and axe-core to automate accessibility scans for a WCAG/ADA compliance audit service I run solo — crawls pages, runs axe-core rules, and compiles violation reports for client audits.",
    tech: ["Playwright", "axe-core", "Node.js"],
    sourcePrivate: true,
    category: "featured",
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
  },
];

export const featuredProjects = projects.filter((p) => p.category === "featured");
export const practiceProjects = projects.filter((p) => p.category === "practice");
