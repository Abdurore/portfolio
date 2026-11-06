# abdurore.tech

Portfolio of Abdulhameed Oreagba (Abdurore). Next.js 16, React 19, Tailwind 4.

```bash
npm run dev          # local dev server
npm run build        # contrast check, build, then content and banned-pattern checks
npm run a11y         # build, then Playwright + axe-core across routes, themes, widths
```

## Where things live

- `data/profile.ts`: name, `EMAIL` constant, socials, skills, experience.
- `data/projects.ts`: the project sheets. Unknowns are `TODO(abdul)` comments.
- `data/audit.ts`: audit packages, prices and Title II dates. One source for the
  audit page and its JSON-LD.
- `app/globals.css`: design tokens (light paper and "Night Still" dark), type
  scale, layout grid, spacing, the specimen-sheet and timeline styles.
- `scripts/`: `check-contrast.mjs` (every text pair, both themes),
  `check-jsonld.mjs` (JSON-LD, meta and wording), `check-banned.mjs` (source grep
  for patterns the design bans).

## Open TODOs

Search the repo for `TODO(abdul)`.
