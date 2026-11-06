#!/usr/bin/env node
/**
 * WCAG contrast check for every text/background pair and UI boundary the
 * site uses, in both themes. Fails the build below threshold:
 *   - normal text:         >= 4.5:1
 *   - large text and UI:   >= 3:1
 *
 * Reads the hex values straight out of app/globals.css so it can't drift
 * from the real tokens. --pollen (timeline ring, status dot) and --rule
 * (hairlines) are decorative and never the only boundary of a control or
 * a carrier of text, so they're printed for information, not enforced.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(join(__dirname, "..", "app", "globals.css"), "utf8");

function tokensOf(re, label) {
  const m = css.match(re);
  if (!m) {
    console.error(`Could not find the ${label} token block in globals.css`);
    process.exit(1);
  }
  const t = {};
  for (const [, k, v] of m[1].matchAll(/--([a-z-]+):\s*(#[0-9a-fA-F]{6});/g)) t[k] = v;
  return t;
}

const themes = {
  Light: tokensOf(/:root\s*\{([^}]*)\}/, ":root"),
  "Night Still": tokensOf(/:root\[data-theme="dark"\]\s*\{([^}]*)\}/, 'data-theme="dark"'),
};
const fallback = tokensOf(/:root:not\(\[data-theme\]\)\s*\{([^}]*)\}/, "no-JS dark fallback");

function lum(hex) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = c.map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function ratio(a, b) {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// [foreground token, background token, minimum, what it is]
const PAIRS = [
  ["ink", "paper", 4.5, "body text on page"],
  ["ink", "sheet", 4.5, "text on sheets and label blocks"],
  ["ink-soft", "paper", 4.5, "secondary text on page"],
  ["ink-soft", "sheet", 4.5, "label keys on sheets"],
  ["moss", "paper", 4.5, "links on page"],
  ["moss", "sheet", 4.5, "links on sheets"],
  ["paper", "moss", 4.5, "primary button text"],
  ["moss", "paper", 3, "focus ring on page"],
  ["moss", "sheet", 3, "focus ring on sheets"],
  ["ink-soft", "paper", 3, "control borders (toggle, menu button)"],
  ["ink-soft", "sheet", 3, "label block border"],
];
const INFO = [
  ["pollen", "paper", "timeline ring (decorative mark)"],
  ["rule", "paper", "hairline (decorative rule)"],
];

let failures = 0;
for (const [theme, t] of Object.entries(themes)) {
  console.log(`\n${theme}`);
  for (const [fg, bg, min, what] of PAIRS) {
    const r = ratio(t[fg], t[bg]);
    const ok = r >= min;
    if (!ok) failures++;
    console.log(`  ${ok ? "PASS" : "FAIL"}  ${r.toFixed(2).padStart(5)}:1 (min ${min})  --${fg} on --${bg}: ${what}`);
  }
  for (const [fg, bg, what] of INFO) {
    console.log(`  info  ${ratio(t[fg], t[bg]).toFixed(2).padStart(5)}:1        --${fg} on --${bg}: ${what}`);
  }
}

// The no-JS media-query fallback must mirror the dark theme exactly.
for (const k of Object.keys(themes["Night Still"])) {
  if (k === "color-scheme") continue;
  if (themes["Night Still"][k] !== fallback[k]) {
    console.log(`FAIL  no-JS dark fallback differs from Night Still for --${k}`);
    failures++;
  }
}

if (failures) {
  console.error(`\n${failures} contrast check(s) failed.`);
  process.exit(1);
}
console.log("\nAll contrast checks passed.");
