# Bootstrap Plan

Status of the initial build-out of this site. This file is the roadmap and the
record of what was decided during bootstrap; longer-lived architectural
reasoning lives in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Objective

A personal technical hub, proof-of-work board and public knowledge index —
explicitly **not** an online CV and **not** a skill-bar portfolio. The premise
is that every claim of competence links to material someone can inspect.

## Phase status

| Phase | Scope                                                       | Status      |
| ----- | ----------------------------------------------------------- | ----------- |
| 0     | Audit, stack proposal, compatibility verification           | Done        |
| 1     | Project bootstrap: build, lint, format, test, CI, app shell | Done        |
| 2     | Design foundation: tokens, typography, layout primitives    | Done (base) |
| 3     | Data model: projects, socials, knowledge, site config       | Done        |
| 4     | Homepage v1 — **structure only**, visual design deferred    | Done        |
| 5     | Project routes: listing + detail                            | Done (v1)   |
| 6     | Quality pass: lint, typecheck, tests, build                 | Done        |
| 7     | Documentation                                               | Done        |
| —     | V0.1: public repo, identity, project hierarchy, OG image    | Done        |
| —     | **Cloudflare Pages deployment** (needs dashboard access)    | **Blocked** |
| —     | Knowledge as a navigable map of the archive                 | Next        |

Phase 4 stopped at correct structure. V0.1 then added the identity layer:
final hero, project hierarchy, real OG image and public source link.

Motion is still deliberately unused. Reveal animations, hover treatments and
route transitions belong to the polish pass, under one rule: **motion must
explain hierarchy or interaction, not demonstrate that we can animate.**

## Stack

Verified mutually compatible on 2026-09-01 (see § Compatibility findings).

| Concern    | Choice                             | Version         |
| ---------- | ---------------------------------- | --------------- |
| UI         | React                              | 19.2.8          |
| Language   | TypeScript                         | 6.0.3           |
| Build      | Vite                               | 8.2.2           |
| Styling    | Tailwind CSS (`@tailwindcss/vite`) | 4.3.3           |
| Routing    | React Router (declarative)         | 8.3.1           |
| Animation  | Motion                             | 13.1.1          |
| Icons      | lucide-react                       | 1.39.0          |
| Lint       | ESLint + typescript-eslint         | 9.39.5 / 8.69.0 |
| Format     | Prettier                           | 3.9.6           |
| Unit tests | Vitest + React Testing Library     | 4.1.11 / 16.3.3 |

## Compatibility findings

Two "latest stable" choices were rejected because the surrounding tooling does
not support them yet. Both are revisit-later, not permanent.

1. **TypeScript 6.0.3, not 7.0.2.** `typescript-eslint@8.69.0` declares
   `typescript >=4.8.4 <6.1.0`. Adopting TS 7 would mean dropping type-aware
   linting. Upgrade when typescript-eslint ships TS 7 support.
2. **ESLint 9.39.5, not 10.** `eslint-plugin-jsx-a11y@6.10.2` peers on
   `eslint ^3 … ^9`. Accessibility is a stated requirement, so the a11y linter
   wins over the newer major. Upgrade when jsx-a11y supports ESLint 10.

A third finding shaped a component: **lucide-react 1.x removed all brand
icons**. Rather than add a second icon dependency for five glyphs, the GitHub,
YouTube, X and Instagram marks are inlined from Simple Icons (CC0-1.0) in
`src/components/ui/BrandIcon.tsx`. LinkedIn was withdrawn from Simple Icons at
LinkedIn's request, so that glyph is hand-drawn.

## Dependency justification

Runtime dependencies are kept to five.

| Package              | Why it is here                                                                                                              |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `react`, `react-dom` | UI runtime.                                                                                                                 |
| `react-router`       | Multi-route IA (`/`, `/projects`, `/projects/:slug`, `/knowledge`, `/about`).                                               |
| `motion`             | Controlled animation in the design phase. **Installed, not yet imported** — it currently contributes 0 bytes to the bundle. |
| `lucide-react`       | UI icon set, tree-shaken per icon.                                                                                          |

Deliberately **not** installed: any component framework (MUI, Chakra, Ant),
Bootstrap, `clsx` + `tailwind-merge` (replaced by a 5-line `cn()` helper), a
head-management library (metadata is static; a 10-line hook sets titles), and
any GitHub API client (see § GitHub data).

## Decisions taken during bootstrap

- **Declarative `BrowserRouter`, not `createBrowserRouter`.** No loaders or
  actions are needed for static content. Cost: `<ScrollRestoration>` requires a
  data router, so an 8-line `useScrollToTop` hook replaces it.
- **No code splitting yet.** Five small routes over static data; splitting would
  add waterfalls to save little. `React.lazy` can be added in `AppRoutes.tsx`
  alone when a route gains a heavy dependency.
- **No client-side GitHub API calls.** V1 ships static metadata. The data layer
  is plain serialisable objects specifically so a build-time sync script can
  later generate JSON into the same shapes.
- **System fonts.** No webfont request, no FOUT, no layout shift.
- **Unknown data is `null`, never invented.** Enforced by tests.

## Open questions for the owner

These are the only items blocked on information rather than effort. Each is a
one-line edit; none blocks the design phase.

1. **Social URLs** — LinkedIn, YouTube, X, Instagram (`src/data/socials.ts`).
   Platforms without a URL are omitted from the UI rather than shown dead.
2. **Production domain** — needed for canonical URL, absolute `og:image` and
   `sitemap.xml` (`src/data/site.ts`, `index.html`, `public/robots.txt`). The
   `.pages.dev` URL can fill this role immediately; a custom domain is not a
   blocker.
3. **Public contact address** (`src/data/site.ts`).
4. **IronMath disclosure boundary** — the stack (React, Fastify, PostgreSQL,
   Python) is confirmed public. Still undecided: which architecture details,
   product metrics and screenshots may appear in the case study.
5. **CyberCuisine metadata** — technologies and period, to be read off the repo
   rather than guessed.
6. **Repository licence** — a public repo mixing code and written content may
   want split terms (e.g. MIT for code, CC BY for prose). Not chosen unilaterally.
7. **Analytics** — none installed. If wanted, a privacy-friendly, cookieless
   option would be documented before being added.
