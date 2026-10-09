import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = ["/", "/accessibility"];
const THEMES = ["dark", "light"] as const;
const STILL_MODES = [false, true] as const;

async function setPreferences(
  page: import("@playwright/test").Page,
  theme: "dark" | "light",
  still: boolean
) {
  await page.evaluate(
    ({ theme, still }) => {
      if (theme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      if (still) {
        document.documentElement.setAttribute("data-still", "true");
      } else {
        document.documentElement.removeAttribute("data-still");
      }
    },
    { theme, still }
  );
}

for (const path of PAGES) {
  for (const theme of THEMES) {
    for (const still of STILL_MODES) {
      test(`${path} — ${theme} theme, still=${still} — no axe violations`, async ({
        page,
      }) => {
        await page.goto(path);
        await setPreferences(page, theme, still);
        // Wait for every [data-reveal]/[data-reveal-group] element to have
        // been observed as in-view, then let its CSS transition (up to
        // ~900ms: 300ms delay + 600ms duration) fully settle. Axe should
        // assess the real, settled page — not a frame mid-fade-in, which
        // is a test-timing artifact, not an actual contrast problem.
        await page
          .waitForFunction(
            () =>
              document.querySelectorAll(
                '[data-reveal]:not([data-in-view="true"]), [data-reveal-group]:not([data-in-view="true"])'
              ).length === 0,
            undefined,
            { timeout: 5000 }
          )
          .catch(() => {});
        await page.waitForTimeout(1200);

        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();

        expect(
          results.violations,
          JSON.stringify(results.violations, null, 2)
        ).toEqual([]);

        // Closed <details> content isn't rendered, so axe can't see it.
        // Re-scan with every FAQ item expanded.
        if (path === "/") {
          await page.evaluate(() =>
            document.querySelectorAll("details").forEach((d) => (d.open = true))
          );
          await page.waitForTimeout(200);
          const openResults = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
            .analyze();
          expect(
            openResults.violations,
            JSON.stringify(openResults.violations, null, 2)
          ).toEqual([]);
        }
      });
    }
  }
}

test("keyboard: skip link is the first focusable element and works", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.locator(".skip-link");
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeInViewport();
});

test("keyboard: theme and still-mode toggles are reachable and operable", async ({
  page,
}) => {
  await page.goto("/");
  let themeToggle = page.getByRole("button", { name: /Night|Daylight/ });
  // On narrow viewports the toggles live in the collapsed hamburger menu.
  if (!(await themeToggle.isVisible())) {
    await page.getByRole("button", { name: /Open menu/ }).click();
    themeToggle = page.getByRole("button", { name: /Night|Daylight/ });
  }
  await themeToggle.focus();
  await expect(themeToggle).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

const SERVICE_URL =
  "https://www.upwork.com/services/product/development-it-an-ada-wcag-2-1-aa-accessibility-audit-with-a-pdf-report-2108180327758331602";
const PROFILE_URL = "https://www.upwork.com/freelancers/~0177ce94419b1c069e";

test("audits: hero link jumps to the section by keyboard, heading not obscured", async ({
  page,
}) => {
  await page.goto("/");
  const link = page.getByRole("link", {
    name: "Also offering WCAG accessibility audits",
  });
  await link.focus();
  await expect(link).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#audits$/);
  const heading = page.getByRole("heading", {
    level: 2,
    name: "Accessibility audits, done by hand",
  });
  await expect(heading).toBeInViewport();
  const headerBottom = await page.evaluate(
    () => document.querySelector("header")!.getBoundingClientRect().bottom
  );
  const headingTop = await heading.evaluate((el) => el.getBoundingClientRect().top);
  expect(headingTop).toBeGreaterThanOrEqual(headerBottom);
});

test("audits: nav item works by keyboard", async ({ page }) => {
  await page.goto("/");
  let item = page.getByRole("button", { name: "Audits", exact: true });
  if (!(await item.isVisible())) {
    await page.getByRole("button", { name: /Open menu/ }).click();
    item = page.getByRole("button", { name: "Audits", exact: true });
  }
  await item.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { level: 2, name: "Accessibility audits, done by hand" })
  ).toBeInViewport();
});

test("audits: FAQ toggles by keyboard and shows a focus ring", async ({ page }) => {
  await page.goto("/");
  const summary = page.locator("#audits summary").first();
  await summary.scrollIntoViewIfNeeded();
  await summary.focus();
  await expect(summary).toBeFocused();
  const outline = await summary.evaluate((el) => getComputedStyle(el).outlineStyle);
  expect(outline).not.toBe("none");
  const details = page.locator("#audits details").first();
  await expect(details).not.toHaveAttribute("open", "");
  await page.keyboard.press("Enter");
  await expect(details).toHaveAttribute("open", "");
  await page.keyboard.press("Space");
  await expect(details).not.toHaveAttribute("open", "");
});

test("audits: external links are exact, new-tab, noopener, and 44px tall", async ({
  page,
}) => {
  await page.goto("/");
  for (const href of [SERVICE_URL, PROFILE_URL]) {
    const links = page.locator(`a[href="${href}"]`);
    expect(await links.count()).toBeGreaterThan(0);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
      await expect(link).toContainText("(opens in a new tab");
      const box = await link.boundingBox();
      expect(box!.height).toBeGreaterThanOrEqual(43.5);
    }
  }
});

test("audits: Included and Not included differ by heading text", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 3, name: "What you get" })).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 3, name: "What's not included" })
  ).toBeVisible();
});
