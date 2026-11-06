import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const ROUTES = ["/", "/accessibility-audit", "/accessibility"];
const THEMES = ["light", "dark"] as const;
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

async function open(page: Page, path: string, theme: "light" | "dark") {
  await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
  await page.goto(path);
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
  // Let the one-off settle-in animation finish so axe reads the settled page.
  await page.waitForTimeout(1000);
}

// ---------- axe: every route x theme (width comes from the project) ----------

for (const path of ROUTES) {
  for (const theme of THEMES) {
    test(`axe: ${path} in ${theme} theme has no violations`, async ({ page }) => {
      await open(page, path, theme);
      const run = () => new AxeBuilder({ page }).withTags(TAGS).analyze();
      const results = await run();
      expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);

      // Closed <details> content isn't rendered, so re-scan with FAQ items open.
      if (await page.locator("details").count()) {
        await page.evaluate(() =>
          document.querySelectorAll("details").forEach((d) => (d.open = true))
        );
        const open = await run();
        expect(open.violations, JSON.stringify(open.violations, null, 2)).toEqual([]);
      }
    });
  }
}

// ---------- Structure ----------

for (const path of ROUTES) {
  test(`structure: ${path} has one h1, no skipped levels, and the landmarks`, async ({ page }) => {
    await page.goto(path);
    const levels = await page.$$eval("h1,h2,h3,h4,h5,h6", (els) =>
      els.map((e) => Number(e.tagName[1]))
    );
    expect(levels.filter((l) => l === 1)).toHaveLength(1);
    levels.forEach((l, i) => {
      if (i > 0) expect(l - levels[i - 1], `heading jump at index ${i}`).toBeLessThanOrEqual(1);
    });
    for (const sel of ["header", "nav", "main", "footer"]) {
      await expect(page.locator(sel).first()).toBeAttached();
    }
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });
}

test("structure: links have unique names per destination, and none open a new tab", async ({
  page,
}) => {
  for (const path of ROUTES) {
    await page.goto(path);
    const links = await page.$$eval("a[href]", (as) =>
      as.map((a) => ({
        name: (a.getAttribute("aria-label") || a.textContent || "").replace(/\s+/g, " ").trim(),
        href: (a as HTMLAnchorElement).href,
        target: a.getAttribute("target"),
      }))
    );
    const byName = new Map<string, Set<string>>();
    for (const l of links) {
      expect(l.target, `${path}: "${l.name}" opens a new tab`).toBeNull();
      expect(l.name, `${path}: link with no name -> ${l.href}`).not.toBe("");
      if (!byName.has(l.name)) byName.set(l.name, new Set());
      byName.get(l.name)!.add(l.href.replace(/#.*$/, "") + (l.href.includes("#") ? "#" : ""));
    }
    for (const [name, hrefs] of byName) {
      // Same name may repeat only when the destination is the same.
      const distinct = [...hrefs].filter((h) => !h.endsWith("#") || hrefs.size === 1);
      expect(distinct.length, `${path}: "${name}" points to ${[...hrefs].join(", ")}`).toBeLessThanOrEqual(1);
    }
  }
});

test("content: Arabic motto has lang and dir, YNWA is an abbr", async ({ page }) => {
  await page.goto("/");
  const ar = page.locator('p[lang="ar"][dir="rtl"]');
  await expect(ar).toHaveText("إن مع العسر يسرا");
  await expect(page.locator("abbr", { hasText: "YNWA" })).toHaveAttribute(
    "title",
    "You'll Never Walk Alone"
  );
});

// ---------- Keyboard ----------

test("keyboard: skip link is first, appears on focus, and works", async ({ page, isMobile }) => {
  test.skip(!!isMobile, "desktop keyboard pass");
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("keyboard: full tab order through the homepage (reported)", async ({ page, isMobile }) => {
  test.skip(!!isMobile, "desktop keyboard pass; the mobile menu has its own test");
  await page.goto("/");
  const stops: string[] = [];
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      const name = (el.getAttribute("aria-label") || el.textContent || "")
        .replace(/\s+/g, " ")
        .trim();
      return {
        label: `${el.tagName.toLowerCase()}${(el as HTMLAnchorElement).href ? ` -> ${(el as HTMLAnchorElement).getAttribute("href")}` : ""}: ${name}`,
        outline: cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) >= 2,
        w: r.width,
        h: r.height,
      };
    });
    if (!info) break;
    if (stops.length && stops[0] === info.label) break;
    // Every stop shows a >=2px focus outline and is >=24x24 CSS px.
    expect(info.outline, `no visible focus ring on ${info.label}`).toBe(true);
    expect(info.w, `target too narrow: ${info.label}`).toBeGreaterThanOrEqual(24);
    expect(info.h, `target too short: ${info.label}`).toBeGreaterThanOrEqual(24);
    stops.push(info.label);
  }
  mkdirSync("test-results", { recursive: true });
  writeFileSync("test-results/tab-order.txt", stops.map((s, i) => `${i + 1}. ${s}`).join("\n"));
  console.log("TAB ORDER\n" + stops.map((s, i) => `${i + 1}. ${s}`).join("\n"));
  expect(stops.length).toBeGreaterThan(20);
  expect(stops[0]).toContain("Skip to content");
});

test("keyboard: mobile menu uses aria-expanded, Escape closes it and returns focus", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile menu only");
  await page.goto("/");
  const btn = page.getByRole("button", { name: "Menu" });
  await expect(btn).toHaveAttribute("aria-expanded", "false");
  await expect(btn).toHaveAttribute("aria-controls", "mobile-menu");
  await btn.focus();
  await page.keyboard.press("Enter");
  await expect(btn).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Work", exact: true })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(btn).toHaveAttribute("aria-expanded", "false");
  await expect(btn).toBeFocused();
  await expect(page.locator("#mobile-menu")).toBeHidden();
});

test("theme: toggle is a pressed-state button named Dark mode and the choice persists", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Dark mode" });
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("button", { name: "Dark mode" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
});

test("theme: follows prefers-color-scheme when nothing is saved", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("theme: still renders when localStorage throws", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("blocked");
      },
    });
  });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", /light|dark/);
});

// ---------- Reflow, zoom, text spacing, motion ----------

for (const path of ROUTES) {
  test(`reflow: ${path} has no horizontal scroll at 320px and at 200% zoom`, async ({ page }) => {
    for (const width of [320, 720]) {
      // 720 CSS px is a 1440px window at 200% zoom.
      await page.setViewportSize({ width, height: 800 });
      await page.goto(path);
      const [sw, vw] = await page.evaluate(() => [
        document.documentElement.scrollWidth,
        document.documentElement.clientWidth,
      ]);
      expect(sw, `${path} at ${width}px`).toBeLessThanOrEqual(vw);
    }
  });

  test(`text spacing: ${path} survives the WCAG text-spacing overrides`, async ({ page }) => {
    await page.goto(path);
    await page.waitForTimeout(1000); // let the hero settle-in finish before axe reads colours
    await page.addStyleTag({
      content:
        "* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p { margin-bottom: 2em !important; }",
    });
    const [sw, vw] = await page.evaluate(() => [
      document.documentElement.scrollWidth,
      document.documentElement.clientWidth,
    ]);
    expect(sw).toBeLessThanOrEqual(vw);
    const results = await new AxeBuilder({ page }).withTags(["wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}

test("motion: reduced motion makes the hero settle-in instant", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const names = await page.$$eval(".settle-sheet, .settle-label", (els) =>
    els.map((e) => getComputedStyle(e).animationName)
  );
  expect(names).toEqual(["none", "none"]);
});

test("motion: with motion allowed the hero settles in within 600ms and nothing else animates", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const timings = await page.$$eval(".settle-sheet, .settle-label", (els) =>
    els.map((e) => {
      const cs = getComputedStyle(e);
      return parseFloat(cs.animationDuration) * 1000 + parseFloat(cs.animationDelay) * 1000;
    })
  );
  expect(Math.max(...timings)).toBeLessThanOrEqual(600);
  const animated = await page.$$eval("body *", (els) =>
    els.filter((e) => getComputedStyle(e).animationName !== "none").length
  );
  expect(animated).toBe(2);
});

test("audit page: FAQ toggles by keyboard with a visible focus ring", async ({ page }) => {
  await page.goto("/accessibility-audit");
  const summary = page.locator("summary").first();
  await summary.focus();
  await expect(summary).toBeFocused();
  expect(await summary.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe("none");
  const details = page.locator("details").first();
  await expect(details).not.toHaveAttribute("open", "");
  await page.keyboard.press("Enter");
  await expect(details).toHaveAttribute("open", "");
});
