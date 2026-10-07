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
