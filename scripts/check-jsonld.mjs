#!/usr/bin/env node
/**
 * Post-build checks on the prerendered HTML (no server needed):
 *  - homepage JSON-LD (Person, WebSite, ProfilePage) is valid and complete
 *  - the audit page's Service JSON-LD matches the visible prices
 *  - meta hygiene: description length, no keywords tag, canonical present
 *  - wording that must never ship: certification claims, "Trusted Tester"
 *    unless followed by "(in progress)", "co-founder" tied to Cardora,
 *    "final-year project", arrows and middle-dot joiners in visible text
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", ".next", "server", "app");
const PAGES = {
  "/": "index.html",
  "/accessibility-audit": "accessibility-audit.html",
  "/accessibility": "accessibility.html",
};

let failures = 0;
const check = (ok, label, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${!ok && detail ? ` ${detail}` : ""}`);
  if (!ok) failures++;
};

const pages = {};
for (const [route, file] of Object.entries(PAGES)) {
  const p = join(root, file);
  if (!existsSync(p)) {
    console.error(`Can't find ${p}: run "next build" first.`);
    process.exit(1);
  }
  const html = readFileSync(p, "utf8");
  const text = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ");
  pages[route] = { html, text };
}

function jsonLdOf(html) {
  const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  return m ? JSON.parse(m[1]) : null;
}

// ---- Homepage graph ----
console.log("\nHomepage JSON-LD");
const home = jsonLdOf(pages["/"].html);
check(home?.["@context"] === "https://schema.org", "@context is https://schema.org");
const g = home?.["@graph"] ?? [];
const person = g.find((n) => n["@type"] === "Person");
const site = g.find((n) => n["@type"] === "WebSite");
const profilePage = g.find((n) => n["@type"] === "ProfilePage");
check(!!person && !!site && !!profilePage, "Person, WebSite and ProfilePage all present");
check(person?.name === "Abdulhameed Oreagba", "Person.name", JSON.stringify(person?.name));
check(
  JSON.stringify(person?.alternateName) ===
    JSON.stringify(["Abdurore", "Oreagba Abdulhameed Oluwadurotimi"]),
  "Person.alternateName",
  JSON.stringify(person?.alternateName)
);
check(person?.jobTitle === "Full-Stack Developer", "Person.jobTitle");
check(
  person?.address?.addressLocality === "Lagos" && person?.address?.addressCountry === "NG",
  "Person.address is Lagos, NG"
);
check(!!person?.url && !!person?.image, "Person.url and image");
check(Array.isArray(person?.knowsAbout) && person.knowsAbout.length > 0, "Person.knowsAbout");
check(
  Array.isArray(person?.sameAs) && person.sameAs.length === 6,
  "Person.sameAs has all 6 profiles",
  JSON.stringify(person?.sameAs)
);
check(profilePage?.mainEntity?.["@id"] === person?.["@id"], "ProfilePage.mainEntity is the Person");

// ---- Audit page Service ----
console.log("\nAudit page");
const audit = pages["/accessibility-audit"];
const svc = jsonLdOf(audit.html);
check(svc?.["@type"] === "Service", "Service JSON-LD present");
const offers = svc?.offers?.offers ?? [];
check(offers.length === 3, "three offers");
const prices = offers.map((o) => Number(o.price));
check(
  String(Math.min(...prices)) === svc?.offers?.lowPrice &&
    String(Math.max(...prices)) === svc?.offers?.highPrice,
  "AggregateOffer low/high match the offers"
);
for (const o of offers) {
  check(audit.text.includes(`$${o.price}`), `visible price $${o.price} matches JSON-LD`);
}
const allowed = new Set([...offers.map((o) => `$${o.price}`), "$40"]);
const stray = [...audit.text.matchAll(/\$\d+(?:,\d{3})*/g)]
  .map((m) => m[0])
  .filter((d) => !allowed.has(d));
check(stray.length === 0, "no unexpected dollar amounts", JSON.stringify(stray));
check(audit.html.includes("2026-07663.htm"), "links the Federal Register notice");
check(
  audit.text.includes("April 26, 2027") && audit.text.includes("April 26, 2028"),
  "shows both Title II dates"
);
check(/dates can change/i.test(audit.text), "has the 'dates can change' note");
const SERVICE_URL = svc?.offers?.url;
const PROFILE_URL = person?.sameAs?.find((u) => u.includes("upwork.com"));
check(audit.html.includes(`href="${SERVICE_URL}"`), "Upwork service URL is an exact href on the audit page");
check(pages["/"].html.includes(`href="${PROFILE_URL}"`), "Upwork profile URL is an exact href on the homepage");
check(
  !/upwork\.com[^"'\s]*\?ref/.test(audit.html + pages["/"].html),
  "no ?ref parameter on Upwork URLs"
);

// ---- Meta hygiene ----
console.log("\nMeta");
for (const [route, { html }] of Object.entries(pages)) {
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  check(desc.length > 0 && desc.length <= 155, `${route} description is 1-155 chars`, `(${desc.length})`);
  check(!/<meta name="keywords"/.test(html), `${route} has no keywords meta`);
  check(
    /<link rel="canonical" href="https:\/\/abdurore\.tech[^"]*"/.test(html),
    `${route} has a canonical`
  );
  check(
    /property="og:title"/.test(html) && /name="twitter:title"/.test(html),
    `${route} has OG and Twitter tags`
  );
  check(/property="og:image"/.test(html), `${route} has an og:image`);
}
check(
  /<title>Abdulhameed Oreagba \(Abdurore\) \| Full-Stack Developer, Lagos<\/title>/.test(
    pages["/"].html
  ),
  "homepage title"
);

// ---- Date ranges ----
console.log("\nDate ranges");
{
  const MONTH = "(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)";
  const END = `(?:present|${MONTH} \\d{4}|\\d{4})`;
  const START = `(?:${MONTH} \\d{4}|\\d{4})`;
  // Raw text with whitespace kept, so thin spaces (U+2009) stay visible.
  const re = new RegExp(`${START}[ \\u2009]*[\\u2013\\u2014-][ \\u2009]*${END}`, "gi");
  let found = 0;
  for (const [route, { html }] of Object.entries(pages)) {
    const raw = html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, "");
    for (const m of raw.match(re) ?? []) {
      found++;
      check(/^[^\u2009]+\u2009\u2013\u2009[^\u2009]+$/.test(m), `${route}: date range uses an en dash between thin spaces`, JSON.stringify(m));
    }
  }
  check(found >= 5, "date ranges were found to check", `(${found})`);
}

// ---- Wording ----
console.log("\nWording");
for (const [route, { text }] of Object.entries(pages)) {
  const trusted = [...text.matchAll(/Trusted Tester(?!\s*\(in progress\))/gi)];
  check(trusted.length === 0, `${route}: "Trusted Tester" only appears as "(in progress)"`);
  for (const banned of [
    "Section 508",
    "testimonial",
    "VPAT included",
    "[email protected]",
    "final-year project",
    "Available for full-stack work",
  ]) {
    check(!text.toLowerCase().includes(banned.toLowerCase()), `${route}: absent "${banned}"`);
  }
  const cert = text.match(/[^.]{0,40}\bcertified\b[^.]{0,40}/gi) ?? [];
  check(cert.length === 0, `${route}: no "certified"`, JSON.stringify(cert));
  const cardora =
    text.match(/[^.]*Cardora[^.]*co-?founder[^.]*|[^.]*co-?founder[^.]*Cardora[^.]*/gi) ?? [];
  check(cardora.length === 0, `${route}: no "co-founder" tied to Cardora`, JSON.stringify(cardora));
  check(!text.includes("→"), `${route}: no arrows in visible text`);
  check(!text.includes("·"), `${route}: no middle-dot joiners in visible text`);
  check(!/Oreagba Abdulhameed/.test(text), `${route}: full legal name is never visible`);
}
const homeText = pages["/"].text;
check(
  !/Seedlings|Ibro|Chef Claude|Tenzies|Tic Tac Toe|Assembly: Endgame/i.test(homeText),
  "removed projects and the Seedlings section are gone from the homepage"
);
check(!/\[0\d\]/.test(homeText), "no [01]...[06] section numbering");
check(homeText.includes("hello@abdurore.tech"), "homepage shows hello@abdurore.tech");

console.log(`\n${failures === 0 ? "All" : failures} content checks ${failures === 0 ? "passed." : "failing."}`);
if (failures > 0) process.exit(1);
