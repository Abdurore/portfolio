#!/usr/bin/env node
/** Source grep for patterns the design brief bans. */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const DIRS = ["app", "components", "data", "lib"];
const RULES = [
  [/→/, "arrow in UI text"],
  [/\buppercase\b/, "uppercase labels"],
  [/\btracking-(wide|wider|widest)\b/, "tracked-out labels"],
  [/\bfont-mono\b|--font-mono|Geist_Mono/, "monospace labels"],
  [/gradient/i, "gradient backgrounds"],
  [/\bshadow(-[a-z0-9]+)?\b|box-shadow/, "card shadows"],
  [/·|&middot;/, "middle-dot joiners"],
  [/IntersectionObserver|framer-motion|data-reveal/, "entrance-effect machinery"],
];

function* files(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) yield* files(p);
    else if ([".ts", ".tsx", ".css"].includes(extname(p))) yield p;
  }
}

let failures = 0;
for (const d of DIRS) {
  for (const file of files(join(ROOT, d))) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      // Comments that describe the ban itself are fine.
      if (/^\s*(\/\/|\/\*|\*)/.test(line)) return;
      for (const [re, what] of RULES) {
        if (re.test(line)) {
          console.log(`FAIL  ${file.replace(ROOT + "/", "")}:${i + 1}  ${what}: ${line.trim()}`);
          failures++;
        }
      }
    });
  }
}
console.log(
  failures
    ? `\n${failures} banned pattern(s) found.`
    : "No banned patterns found in app/, components/, data/, lib/."
);
process.exit(failures ? 1 : 0);
