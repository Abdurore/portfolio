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
};

export const projects: Project[] = [
  {
    slug: "cardora",
    name: "Cardora UI",
    pitch: "Create, share, and collect interactive digital cards — with a live economy behind them.",
    description:
      "Vite + React single-page app for creating, previewing, sharing, and managing interactive digital cards. Features dynamic pricing synced to a backend API, a studio for building poll/trivia/chain cards, a rewards hub with daily streak bonuses, and premium chat frame/profile decorators.",
    tech: ["React", "Vite", "REST API", "CSS Custom Properties"],
    liveUrl: "https://cardora.studio",
    sourcePrivate: true,
    category: "featured",
    span: "lg",
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
  },
];

export const featuredProjects = projects.filter((p) => p.category === "featured");
export const practiceProjects = projects.filter((p) => p.category === "practice");
