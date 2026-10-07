#!/usr/bin/env node
/**
 * Computes WCAG contrast ratios for every real text/background token pair
 * used on the site, in both themes, and fails the build if any pair is
 * below threshold:
 *   - body text:        >= 7:1   (AAA)
 *   - other text:       >= 4.5:1 (AA)
 *   - large text / UI:  >= 3:1   (AA)
 *
 * Reads the actual hex values out of app/globals.css rather than
 * duplicating them here, so this can't silently drift from the real
 * tokens. --moss is the one token that's border/decorative-only and is
 * intentionally not text-checked.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cssPath = join(__dirname, "..", "app", "globals.css");
const css = readFileSync(cssPath, "utf8");

function extractTokens(block) {
  const tokens = {};
  const re = /--(soil|canopy|bark|moss|fern|sage|bone|firefly):\s*(#[0-9a-fA-F]{6});/g;
  let m;
  while ((m = re.exec(block))) {
    tokens[m[1]] = m[2];
  }
  return tokens;
}

const rootBlockMatch = css.match(/:root\s*\{([^}]*)\}/);
const lightBlockMatch = css.match(/:root\[data-theme="light"\]\s*\{([^}]*)\}/);
if (!rootBlockMatch || !lightBlockMatch) {
  console.error("Could not find :root or :root[data-theme=\"light\"] blocks in globals.css");
  process.exit(1);
}

const themes = {
  dark: extractTokens(rootBlockMatch[1]),
  light: extractTokens(lightBlockMatch[1]),
};

for (const [name, tokens] of Object.entries(themes)) {
  for (const key of ["soil", "canopy", "bark", "moss", "fern", "sage", "bone", "firefly"]) {
    if (!tokens[key]) {
      console.error(`Theme "${name}" is missing --${key}`);
      process.exit(1);
    }
  }
}

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function relativeLuminance({ r, g, b }) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hexToRgb(hex1));
  const l2 = relativeLuminance(hexToRgb(hex2));
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

const THRESHOLDS = { body: 7, other: 4.5, large: 3 };

let failures = 0;
let checked = 0;

function check(theme, label, fgHex, bgHex, kind) {
  const ratio = contrastRatio(fgHex, bgHex);
  const threshold = THRESHOLDS[kind];
  checked++;
  const ok = ratio >= threshold;
  if (!ok) failures++;
  const status = ok ? "PASS" : "FAIL";
  console.log(
    `[${theme}] ${status}  ${label.padEnd(42)} ${ratio.toFixed(2)}:1  (need >= ${threshold}:1, ${kind})`
  );
}

for (const [theme, t] of Object.entries(themes)) {
  const surfaces = { soil: t.soil, canopy: t.canopy, bark: t.bark };

  // Primary body text (bone/foreground) on every real surface -> AAA 7:1
  for (const [surfaceName, surfaceHex] of Object.entries(surfaces)) {
    check(theme, `bone (body text) on ${surfaceName}`, t.bone, surfaceHex, "body");
  }

  // Secondary/muted text (sage) on every real surface -> AA 4.5:1
  for (const [surfaceName, surfaceHex] of Object.entries(surfaces)) {
    check(theme, `sage (muted text) on ${surfaceName}`, t.sage, surfaceHex, "other");
  }

  // Accent (fern) used as large headline text / icons -> AA 3:1 (large text/UI)
  for (const [surfaceName, surfaceHex] of Object.entries(surfaces)) {
    check(theme, `fern (accent, large text/icon) on ${surfaceName}`, t.fern, surfaceHex, "large");
  }

  // Firefly used for the focus ring and rare highlights -> non-text UI, 3:1
  check(theme, "firefly (focus ring) on soil", t.firefly, t.soil, "large");

  // Button text: background color used as text on accent-filled buttons
  // (View Projects, Say Hi, the email CTA) -> real body-size text, 4.5:1
  check(theme, "soil (button text) on fern (filled button)", t.soil, t.fern, "other");
}

console.log(`\n${checked} pairs checked, ${failures} failing.`);
if (failures > 0) {
  console.error("\nContrast check failed. Adjust the failing token(s) in app/globals.css.");
  process.exit(1);
}
console.log("All contrast pairs pass.");
