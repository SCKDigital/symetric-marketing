# symetric marketing site

Marketing site for **symetric**, a symptom-tracking app for Android and iOS.
This repo is the site only, it does not contain the app.

## Stack

Astro, TypeScript, plain CSS with custom properties (`src/styles/tokens.css`),
Fontsource self-hosted fonts, Markdown content collections for the long-form
pages. No client-side JavaScript except the hero check-in grid
(`src/scripts/checkin-grid.js`).

## Commands

| Command           | Action                                    |
| :----------------- | :---------------------------------------- |
| `npm install`       | Install dependencies                      |
| `npm run dev`        | Start local dev server at `localhost:4321` |
| `npm run build`      | Build the production site to `./dist/`    |
| `npm run preview`    | Preview the production build locally      |

## Outstanding before launch

- `public/brand/` has only `symetric-logo.svg`. No PNG favicon fallback, no
  `apple-touch-icon.png` (180x180), no Open Graph image (1200x630), see the
  `TODO` comments in `src/layouts/BaseLayout.astro`.
- `astro.config.mjs` sets `site: "https://symetric.app"` as a placeholder,
  replace with the real domain before deploying (it feeds the sitemap and
  canonical/OG URLs).
- "Get symetric" buttons point at `#`, no App Store or Play Store listing
  URLs yet.
- No price is set anywhere on the site (it's one-off, not free, but no
  figure exists yet), see the `TODO` comment in `src/layouts/BaseLayout.astro`.
- `public/symetric-sample-report.pdf` is a one-line placeholder PDF, not the
  real 5-page sample report.
- Eight pages under `src/content/pages/` are `TODO:` stubs with working
  layout/nav/footer only: report, first-six-weeks, your-data, for-clinicians,
  about, privacy, terms, support.
