# Accessibility report

Last updated: 7 October 2026

This records what was actually tested, how, and what it found — not a
conformance claim. The live statement for site visitors is at
`/accessibility`; this file is the backing detail for anyone (including
future-me) who wants to re-verify or extend the work.

## Target

WCAG 2.2 Level AA, with body text aimed at the stricter AAA contrast
threshold (7:1) where achievable.

## 1. Automated: Playwright + axe-core

`npm run a11y` runs `tests/a11y.spec.ts` against a production build
(`next build && next start`), using axe-core via `@axe-core/playwright`
with rules tagged `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa`.

Matrix covered: `/` and `/accessibility` × Night/Daylight theme × Still
mode on/off × desktop and mobile viewports (20 test cases total), plus
two dedicated keyboard-operability checks (skip link, theme/still
toggles — including the mobile hamburger-menu path).

**Result at last run: 20/20 passing, zero axe violations in every
combination.**

```
20 passed (1.3m)
```

Two real bugs surfaced and were fixed while building this suite (not
just test flakiness):

- `useInView`'s SSR fallback returned `true` (i.e. "already revealed")
  because `IntersectionObserver` is also `undefined` in Node during
  server rendering, which the hook's old check couldn't distinguish from
  a real old-browser fallback. Every section below the fold hydrated
  with a mismatched `data-in-view` value. Fixed by checking
  `typeof window === "undefined"` first.
- Anchor/nav scrolling landed section headings partially underneath the
  fixed header. Fixed with `scroll-margin-top` on `main > section`.

One test-harness bug (not a site bug) is worth recording: an early
version of the suite called
`page.waitForFunction(fn, { timeout: 5000 })` — Playwright interprets a
plain object there as the function's *argument*, not as `options`, so
the real timeout silently stayed at the 30s default. Fixed by passing
`undefined` as the arg: `waitForFunction(fn, undefined, { timeout: 5000 })`.

**Run notes:** this sandbox's pre-fetched Chromium trails the version
`@playwright/test` expects, so `playwright.config.ts` points
`launchOptions.executablePath` at `/opt/pw-browsers/chromium` *only if
that path exists* — a no-op on a normal machine or CI runner. The suite
is also configured `workers: 1` / `fullyParallel: false` because this
specific container got flaky under concurrent browser instances during
development; that's a documented, conservative default you can loosen
once you've confirmed your own environment handles it.

## 2. Contrast: `scripts/check-contrast.mjs`

Reads the real hex values straight out of `app/globals.css` (so it can't
drift from the actual tokens) and computes WCAG contrast for every
text/background pair actually used in the UI, in both themes. Wired as
`"prebuild"` in `package.json`, so `npm run build` fails loudly on a
regression; also runnable directly as `npm run check-contrast`.

**Result at last run: 22/22 pairs passing** (full output below).
`--moss` is intentionally excluded — it's border/decorative-only and
never used as text (verified by grep).

```
[dark] PASS  bone (body text) on soil                   17.00:1  (need >= 7:1, body)
[dark] PASS  bone (body text) on canopy                 15.49:1  (need >= 7:1, body)
[dark] PASS  bone (body text) on bark                   13.10:1  (need >= 7:1, body)
[dark] PASS  sage (muted text) on soil                  12.13:1  (need >= 4.5:1, other)
[dark] PASS  sage (muted text) on canopy                11.05:1  (need >= 4.5:1, other)
[dark] PASS  sage (muted text) on bark                  9.34:1  (need >= 4.5:1, other)
[dark] PASS  fern (accent, large text/icon) on soil     7.74:1  (need >= 3:1, large)
[dark] PASS  fern (accent, large text/icon) on canopy   7.05:1  (need >= 3:1, large)
[dark] PASS  fern (accent, large text/icon) on bark     5.96:1  (need >= 3:1, large)
[dark] PASS  firefly (focus ring) on soil               13.31:1  (need >= 3:1, large)
[dark] PASS  soil (button text) on fern (filled button) 7.74:1  (need >= 4.5:1, other)
[light] PASS  bone (body text) on soil                   14.11:1  (need >= 7:1, body)
[light] PASS  bone (body text) on canopy                 15.98:1  (need >= 7:1, body)
[light] PASS  bone (body text) on bark                   12.32:1  (need >= 7:1, body)
[light] PASS  sage (muted text) on soil                  6.76:1  (need >= 4.5:1, other)
[light] PASS  sage (muted text) on canopy                7.65:1  (need >= 4.5:1, other)
[light] PASS  sage (muted text) on bark                  5.90:1  (need >= 4.5:1, other)
[light] PASS  fern (accent, large text/icon) on soil     5.65:1  (need >= 3:1, large)
[light] PASS  fern (accent, large text/icon) on canopy   6.40:1  (need >= 3:1, large)
[light] PASS  fern (accent, large text/icon) on bark     4.94:1  (need >= 3:1, large)
[light] PASS  firefly (focus ring) on soil               4.89:1  (need >= 3:1, large)
[light] PASS  soil (button text) on fern (filled button) 5.65:1  (need >= 4.5:1, other)

22 pairs checked, 0 failing.
```

Two real issues this script caught and that got fixed in the token
design (not just the one-off failing elements):

- Opacity-modified "muted" text (`text-muted/60`, `/70`, `/80`, used in
  the footer, project cards, About's skill-group labels, and
  Experience) failed contrast in the Daylight theme as low as 2.6:1 —
  alpha-blending the same color toward a light background drops
  contrast fast. Fixed by removing all opacity modifiers from text
  color classes site-wide; opacity is now only used on genuinely
  decorative, non-text elements (the botanical line art, hover states).
- The Daylight theme's `--firefly` (focus ring / rare highlight color)
  was 2.87:1 against the page background, just under the 3:1 UI-contrast
  minimum. Darkened from `#b8860b` to `#8a6107`.

## 3. Lighthouse

Run locally against a production build (`next build && next start`) in
this sandboxed dev container, mobile form factor, via:

```
CHROME_PATH=/opt/pw-browsers/chromium npx lighthouse http://localhost:3000/ \
  --chrome-flags="--headless=new --no-sandbox --disable-gpu" \
  --form-factor=mobile --screenEmulation.mobile
```

| Category       | Score |
| -------------- | ----- |
| Accessibility  | **100** |
| SEO            | **100** (baseline — Phase 4 adds the full metadata/JSON-LD pass) |
| Best Practices | 96 |
| Performance    | 93–95 across repeated runs (target: ≥95) |

Accessibility hit the target exactly. Performance is close but landed
under 95 on 2 of 3 runs, so I'm reporting it honestly rather than
rounding up. Two things make the local number pessimistic compared to
what you'll actually see on `abdurore.tech`:

- `@vercel/analytics`'s script only resolves on a real Vercel deployment
  — locally it 404s and retries, adding failed-request overhead that
  won't exist in production.
- Lighthouse's mobile run simulates throttled CPU/network on top of an
  already resource-shared sandbox container; `next start` here has none
  of Vercel's edge caching, compression, or CDN proximity.

What I did apply, not just excuse: removed framer-motion entirely
(smaller JS bundle, no React re-render churn from scroll listeners),
and added `sizes` to every `next/image` usage that was missing it (the
headshot and project screenshots were requesting a larger source image
than their actual rendered size). **TODO for you: re-run Lighthouse
against the live `abdurore.tech` deployment once it's up, and treat that
number as the real one** — if it's still under 95 there, that's worth a
follow-up pass with real production data to look at (I'd start with the
LCP breakdown, since that's the lowest-scoring individual metric at
~3s).

## Manual checklist (for you to run)

Automated tools and my own keyboard pass cover a lot, but a few things
need a human with real assistive tech, which I don't have here:

- [ ] **Keyboard-only walkthrough**: unplug your mouse, tab through the
      entire site (both themes), confirm focus is always visible and
      the order makes sense, no traps.
- [ ] **200% browser zoom**: check nothing clips, overlaps, or requires
      horizontal scrolling.
- [ ] **400% browser zoom** (WCAG 2.2's reflow requirement): same check,
      more extreme — content should reflow to a single column rather
      than requiring 2D scrolling.
- [ ] **NVDA pass** (Windows, Firefox or Chrome): navigate by heading,
      by landmark, and tab through interactive elements. Confirm the
      status line, project status chips, and toggle states are
      announced sensibly.
- [ ] **VoiceOver pass** (macOS Safari, or iOS Safari): same checks.
- [ ] **forced-colors / Windows High Contrast Mode**: confirm borders
      stay visible and the botanical SVGs (which use `currentColor`)
      don't disappear or turn into unreadable blobs.
- [ ] Re-run `npm run a11y` and `npm run check-contrast` after any
      future visual change, before merging.

## One documented judgment call

WCAG 2.2's 2.5.8 (Target Size Minimum, AA) requires 24×24px targets but
explicitly exempts targets "in a sentence or block of text." The compact
inline links on project cards ("Cardora live demo", "Source code" etc.)
sit in a short row of links rather than a button grid, and rely on that
inline exception rather than hitting 44px like the primary CTAs do. All
*primary* controls (nav buttons, toggles, hero/contact CTAs, social
icons) are a full 44×44px via `min-h-11`/`h-11 w-11`.

## Known limitations

- The manual checklist above is unchecked at time of writing — I ran
  everything that can be automated or driven by a keyboard script, but
  a real screen-reader pass needs a human.
- Performance (not accessibility) is the one Lighthouse category under
  target locally; see above for why and what to check once deployed.
- `check-contrast.mjs` checks the color tokens that are actually wired
  into Tailwind classes across the codebase; it doesn't catch a future
  one-off inline `style={{ color: ... }}` that bypasses those classes.
