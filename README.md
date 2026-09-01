# samuelecorra.dev — personal technical hub

The personal site of **Samuele Corrà**: a proof-of-work board and public
knowledge index rather than an online CV.

The premise is simple:

> Don't merely claim competence. Link to evidence.

Professional history belongs on LinkedIn. This site is about what gets built,
what gets studied, and where the material behind both can be read.

This repository is itself part of the portfolio — the architecture, design
system and content model are meant to be read.

**Source:** <https://github.com/samuelecorra/portfolio>

## Stack

React 19 · TypeScript 6 · Vite 8 · Tailwind CSS 4 · React Router 8 · Vitest 4

Five runtime dependencies total. Every one is justified in
[`BOOTSTRAP_PLAN.md`](BOOTSTRAP_PLAN.md#dependency-justification).

## Getting started

Requires Node `>=20.19` (`.nvmrc` pins 24).

```bash
npm install
npm run dev
```

## Commands

| Command                 | Does                                        |
| ----------------------- | ------------------------------------------- |
| `npm run dev`           | Dev server with HMR                         |
| `npm run build`         | Typecheck, then production build to `dist/` |
| `npm run preview`       | Serve the production build locally          |
| `npm run typecheck`     | `tsc --noEmit` over app and config projects |
| `npm run lint`          | ESLint (type-aware, incl. a11y rules)       |
| `npm run format`        | Prettier write                              |
| `npm run format:check`  | Prettier check (CI gate)                    |
| `npm test`              | Vitest run                                  |
| `npm run test:watch`    | Vitest watch                                |
| `npm run test:coverage` | Vitest with V8 coverage                     |

CI runs format-check, lint, typecheck, test and build on every push and PR.

## Architecture at a glance

```
src/
├── app/          route table + router setup
├── components/   layout · navigation · projects · knowledge · social · ui
├── sections/     composed homepage sections
├── pages/        one component per route
├── data/         ← all content lives here
├── hooks/
├── lib/
├── styles/       design tokens (Tailwind v4 CSS-first @theme)
└── types/        the domain contract
```

**The UI is data-driven.** Components render; they never hold content. Adding a
project means adding one object to `src/data/projects.ts` — no component edits.

**The site is trilingual** (English, Italian, German) with a picker in the
navbar. Custom ~150-line implementation, no i18n dependency; the English
dictionary is the type, so incomplete translations fail the build.

**The curriculum is generated, not written.** `npm run sync:archive` reads the
knowledge archive's own manifest and derives every subject, module, unit and
lesson — 24 subjects, 167 modules, 287 didactic units, 1,558 lessons, 6,110
files. Nobody types those numbers.

Detail:

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — decisions and why
- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) — tokens, type, motion rules
- [`docs/CONTENT_MODEL.md`](docs/CONTENT_MODEL.md) — how content is represented

## Transparency

Two rules govern content in this repository:

1. **Unknown data is `null`, never invented.** Placeholder URLs, guessed tech
   stacks and filler prose do not ship. Socials without a confirmed URL are
   omitted from the UI; projects without a case study show metadata and stop.
2. **Private stays private.** A project's `repository.url` is non-null only when
   `visibility === 'public'`, so it is structurally impossible to render a
   source link to a private repository. This is enforced by tests in
   `src/data/projects.test.ts`.

Items still awaiting real values are listed in
[`BOOTSTRAP_PLAN.md`](BOOTSTRAP_PLAN.md#open-questions-for-the-owner) and marked
`TODO(owner)` in the source.

**Analytics: none.** No tracking scripts, no cookies, no third-party requests.

## Deployment

The build output is a portable static site in `dist/`. Nothing in the app is
coupled to a specific host.

Path: GitHub → Cloudflare Pages.

Cloudflare now routes new Git-connected projects into **Workers** rather than
Pages. `wrangler.jsonc` in the repo root configures a static-assets-only Worker
serving `dist/`, with first-class SPA fallback.

Connect the repository at **Cloudflare dashboard → Workers & Pages → Create →
Connect to Git**, with:

| Setting           | Value                                            |
| ----------------- | ------------------------------------------------ |
| Framework preset  | None (or Vite)                                   |
| Build command     | `npm run build`                                  |
| Output directory  | `dist`                                           |
| Production branch | `main`                                           |
| Node version      | `24` (`NODE_VERSION` env var, matching `.nvmrc`) |

The Git integration must be set up through the dashboard rather than Wrangler:
only a Git-connected project gets automatic **preview deployments per branch and
pull request**, which is the point — every `feat/*` branch gets its own public
URL to review a redesign on real devices instead of localhost. Enable
_non-production branch builds_ when connecting, or previews never fire.

```
main    → production   (portfolio.pages.dev)
feat/*  → preview      (<branch>.portfolio.pages.dev)
```

**SPA fallback** is required so `/projects/ironmath` resolves instead of 404ing.
On Cloudflare this is `not_found_handling: "single-page-application"` in
`wrangler.jsonc` — nothing else is needed.

Do **not** add a `public/_redirects` containing `/* /index.html 200` alongside
it: Workers static assets validates that file, normalises `/index.html` to `/`,
and rejects the rule as an infinite loop, failing the deploy.

Moving to another host means adding its own fallback instead — `_redirects` on
Netlify, a `vercel.json` rewrite of `/(.*)` → `/index.html` on Vercel. The build
output itself is plain static files and stays host-agnostic.

## Licence

Not yet chosen — see
[open questions](BOOTSTRAP_PLAN.md#open-questions-for-the-owner). Until then,
all rights reserved.
