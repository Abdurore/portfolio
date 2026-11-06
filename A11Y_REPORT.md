# Accessibility report

Last tested: 6 November 2026 (design pass 2)

Backing detail for the public statement at `/accessibility`. This records what
was tested and found. It is not a conformance claim.

## Target

- This site: WCAG 2.2 Level AA.
- The audits I sell: WCAG 2.1 AA.

## Automated: Playwright + axe-core

`npm run a11y` builds the site and runs `tests/a11y.spec.ts` against it.

- Rules: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`.
- Matrix: `/`, `/accessibility-audit`, `/accessibility` × light and Night Still
  themes × 390px and 1440px viewports. The audit FAQ is re-scanned expanded.
- Result at last run: 49 passed, 0 failed, 3 skipped. The 3 skips are keyboard
  tests that only apply to the other viewport (the mobile menu test on desktop,
  the tab-order and skip-link tests on mobile). **Zero axe violations.**

Also covered by the suite: one h1 per page with no skipped heading levels,
landmarks, link names unique per destination, no new-tab links, the Arabic motto
and `abbr`, no horizontal scroll at 320px and at 200% zoom (720 CSS px), the WCAG
text-spacing overrides, the theme toggle (`aria-pressed`, persistence,
`prefers-color-scheme`, `localStorage` throwing), mobile menu (`aria-expanded`,
Escape returns focus), and reduced motion.

## Contrast

`scripts/check-contrast.mjs` reads the tokens from `app/globals.css` and runs on
every build (`prebuild`). Every text pair is ≥4.5:1 and every control boundary
and focus ring is ≥3:1, in both themes. `--pollen` (2.74:1 on the light paper)
is only used for the decorative timeline ring, never for text or a boundary.

## Keyboard pass (homepage, desktop)

Tab order, 30 stops, each with a visible ≥2px focus ring and a ≥24×24px target:

1. Skip to content
2. Abdurore (home)
3. Work, Experience, Audits, About, Contact, Résumé
4. Dark mode (toggle)
5. See my work, Download résumé (PDF)
6. Selected work links: Euphorium app, euphorium.me, Cardora demo, PreventAI
   demo, PreventAI source, Halal Meats store
7. Experience links: corbel.ng, halalcert.com.ng
8. See audit packages
9. hello@abdurore.tech, then GitHub, LinkedIn, X, Instagram, Upwork, YouTube
10. Footer: Accessibility statement, Accessibility audits

## Lighthouse (mobile, production build, local)

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| `/` | 89 to 99 (five runs) | 100 | 96 | 100 |
| `/accessibility-audit` | 98 | 100 | 96 | 100 |
| `/accessibility` | 97 | 100 | 96 | 100 |

The homepage performance score swings between runs because its LCP (the hero
portrait) alternates between about 0.9s and 3.3s; the median is in the 90s.
The one best-practices deduction is `/_vercel/insights/script.js` returning 404
when served locally; it exists on Vercel.

## Not yet done

A full NVDA and VoiceOver pass, 400% zoom beyond the 320px reflow check, and
forced-colors mode are still manual items.
