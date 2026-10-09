#!/usr/bin/env node
/**
 * Validates the JSON-LD emitted in app/layout.tsx by reading it straight
 * out of the prerendered HTML build output — no server needed. Checks
 * the graph parses and that each node has the fields a consumer
 * (Google, a social-share unfurl, a screen reader's structured-data
 * mode) would actually rely on.
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(__dirname, "..", ".next", "server", "app", "index.html");

if (!existsSync(htmlPath)) {
  console.error(
    `Can't find ${htmlPath} — run "next build" before check-jsonld.mjs.`
  );
  process.exit(1);
}

const html = readFileSync(htmlPath, "utf8");
const match = html.match(
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
);

if (!match) {
  console.error("No <script type=\"application/ld+json\"> tag found in the rendered page.");
  process.exit(1);
}

let data;
try {
  data = JSON.parse(match[1]);
} catch (e) {
  console.error("JSON-LD did not parse as valid JSON:", e.message);
  process.exit(1);
}

let failures = 0;
function assertField(node, field, label, predicate = (v) => v !== undefined && v !== null && v !== "") {
  const value = node[field];
  const ok = predicate(value);
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}: ${field} = ${JSON.stringify(value)}`);
  if (!ok) failures++;
}

if (data["@context"] !== "https://schema.org") {
  console.log("FAIL  top-level @context should be https://schema.org");
  failures++;
} else {
  console.log("PASS  top-level @context is https://schema.org");
}

if (!Array.isArray(data["@graph"])) {
  console.error("FAIL  @graph is not an array — cannot check further. Aborting.");
  process.exit(1);
}

const graph = data["@graph"];
const byType = (type) => graph.find((n) => n["@type"] === type);

const person = byType("Person");
if (!person) {
  console.error("FAIL  No Person node in @graph.");
  failures++;
} else {
  assertField(person, "name", "Person");
  assertField(person, "alternateName", "Person", (v) => Array.isArray(v) && v.length >= 4);
  assertField(person, "url", "Person");
  assertField(person, "image", "Person");
  assertField(person, "jobTitle", "Person");
  assertField(person, "email", "Person");
  assertField(person, "address", "Person", (v) => v && v.addressLocality);
  assertField(person, "alumniOf", "Person", (v) => v && v.name);
  assertField(person, "knowsAbout", "Person", (v) => Array.isArray(v) && v.length > 0);
  assertField(person, "sameAs", "Person", (v) => Array.isArray(v) && v.length > 0);
}

const website = byType("WebSite");
if (!website) {
  console.error("FAIL  No WebSite node in @graph.");
  failures++;
} else {
  assertField(website, "url", "WebSite");
  assertField(website, "name", "WebSite");
  assertField(website, "publisher", "WebSite", (v) => v && v["@id"]);
}

const profilePage = byType("ProfilePage");
if (!profilePage) {
  console.error("FAIL  No ProfilePage node in @graph.");
  failures++;
} else {
  assertField(profilePage, "url", "ProfilePage");
  assertField(
    profilePage,
    "mainEntity",
    "ProfilePage",
    (v) => v && v["@id"] && person && v["@id"] === person["@id"]
  );
}

const itemList = byType("ItemList");
if (!itemList) {
  console.error("FAIL  No ItemList node in @graph.");
  failures++;
} else {
  assertField(itemList, "itemListElement", "ItemList", (v) => Array.isArray(v) && v.length > 0);
  for (const [i, listItem] of (itemList.itemListElement ?? []).entries()) {
    const item = listItem.item;
    const ok =
      item &&
      ["SoftwareApplication", "CreativeWork"].includes(item["@type"]) &&
      item.name &&
      item.url;
    console.log(
      `${ok ? "PASS" : "FAIL"}  ItemList[${i}]: ${item?.name ?? "(missing)"} — @type/name/url present`
    );
    if (!ok) failures++;
  }
}

console.log(`\n${failures === 0 ? "All" : failures} JSON-LD checks ${failures === 0 ? "passed." : "failing."}`);
if (failures > 0) process.exit(1);
