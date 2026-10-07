import { existsSync } from "node:fs";
import { defineConfig, devices } from "@playwright/test";

// Some sandboxes/containers ship a pre-fetched Chromium at a fixed path
// that can trail the version @playwright/test expects, which makes the
// normal browser auto-resolution fail. Use it only when present; on a
// normal machine or CI runner this is a no-op and Playwright resolves
// its own managed browser as usual.
const SANDBOX_CHROMIUM = "/opt/pw-browsers/chromium";
const launchOptions = existsSync(SANDBOX_CHROMIUM)
  ? {
      executablePath: SANDBOX_CHROMIUM,
      args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
    }
  : undefined;

export default defineConfig({
  testDir: "./tests",
  // Kept serial: this sandbox's pre-fetched browser got flaky under
  // heavy parallel load during development. Bump this back up if you've
  // verified it's stable in your own environment.
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    launchOptions,
  },
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 5"] } },
  ],
});
