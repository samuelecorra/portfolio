# Architecture

Decisions that are not obvious from reading the code, and why they were made.
Reversible choices are marked as such.

## Shape of the application

A client-rendered SPA built by Vite into static assets. No server, no runtime
data fetching, no client state beyond a mobile menu toggle. Content is compiled
in from `src/data/**`.

This is the right shape while the site is small and its content is authored by
one person in a repository. It stops being the right shape the moment content
needs to come from elsewhere, or per-route crawler metadata becomes important —
see § SEO for where that boundary sits.

## Layering

```
data (plain objects)  →  types (contract)  →  components (render)  →  pages  →  routes
```

The rule that keeps this honest: **`src/data/**` imports nothing from React.**
Data files are plain, serialisable objects. That is what makes the planned
build-time GitHub sync possible — a script can emit JSON in exactly these shapes
without the app changing.

The one place this needed defending is icons. Data files reference icons by
semantic _name_ (`'github'`, `'database'`), and `src/components/ui/Icon.tsx`
maps names to components. Importing Lucide components into data would have
broken serialisability for no gain.

## Routing

**Declarative `<BrowserRouter>`, not `createBrowserRouter`.**

There is no data to load per route — everything is a static import — so loaders,
actions and deferred data buy nothing. The declarative API is smaller and
simpler to read.

One consequence: `<ScrollRestoration>` requires a data router. Rather than adopt
a data router for one feature, `src/hooks/useScrollToTop.ts` implements the one
behaviour actually needed (scroll to top on navigation, unless the URL has a
hash). _Reversible:_ migrating to `createBrowserRouter` later is a change to
`App.tsx` and `AppRoutes.tsx` only.

**No code splitting.** Five small routes over static data. Splitting would add
request waterfalls to save a trivial amount of JavaScript. Baseline bundle is
~260 kB raw / ~83 kB gzip, which is React and the router. `React.lazy` belongs
in `AppRoutes.tsx` when a single route gains a heavy dependency (a chart library,
a syntax highlighter) — not before.

The router requires an **SPA fallback** on static hosts, otherwise deep links 404. See `public/_redirects` and README § Deployment.

## Styling

Tailwind CSS v4 via `@tailwindcss/vite`, configured **CSS-first**. There is no
`tailwind.config.js`; tokens live in `@theme` blocks in `src/styles/index.css`
and generate both CSS custom properties and matching utilities.

One subtlety worth knowing: Tailwind tree-shakes theme variables that no utility
references. Motion tokens are therefore declared in a `@theme static` block, so
curves and durations referenced only from inline styles or from Motion in JS are
always emitted. Colour tokens are left tree-shakeable.

## TypeScript

Strict, with `noUncheckedIndexedAccess`, `noImplicitReturns`,
`noImplicitOverride` and unused-symbol checks on. `any` is an ESLint error.

`exactOptionalPropertyTypes` is deliberately **off**. It fights ordinary React
prop-spreading idioms and its failure mode is noise rather than caught bugs. The
"unknown value" problem it might have helped with is solved differently and more
explicitly — see § Representing the unknown.

Two projects: `tsconfig.json` (app, DOM libs) and `tsconfig.node.json`
(`vite.config.ts`, Node types). `npm run typecheck` checks both. `baseUrl` is
not used — deprecated in TS 6 and removed in TS 7; path aliases resolve relative
to the config file.

**TypeScript is pinned to 6.0.3, not 7.** `typescript-eslint` does not support
TS 7 yet, and losing type-aware linting is a worse trade than being one major
behind. Same reasoning pins ESLint to 9 (jsx-a11y has no ESLint 10 support).
Both are tracked in `BOOTSTRAP_PLAN.md`.

## Representing the unknown

The site's credibility depends on not shipping invented content, so this is
enforced structurally rather than by discipline:

- `Unconfirmed<T> = T | null`. `null` means "the owner has not confirmed this".
  Never `undefined`, never a placeholder string.
- A `ProjectRepository` carries a non-null `url` **only** when
  `visibility === 'public'`. Private and unpublished repositories cannot be
  linked because there is nothing to link.
- Rendering code branches on `null` explicitly: socials without a URL are
  omitted, projects without a case study show metadata and say so.

`src/data/projects.test.ts` asserts these invariants, including that no project
with a non-public repository carries a `github.com` link anywhere.

## GitHub data

**No client-side GitHub API requests.** They would mean loading states, failure
states and a 60 requests/hour unauthenticated rate limit shared across every
visitor — for metadata that changes daily at most.

The planned path, deliberately not built yet:

```
GitHub API → build-time sync script → generated JSON → app
```

The seam already exists: `Project.githubMetrics` is typed
(`stars`, `primaryLanguage`, `lastUpdated`, `topics`) and set to `null`
everywhere. Populating it requires no type or component changes.

## Internationalisation

Custom, not a library. English, Italian, German.

`react-i18next` and friends solve interpolation, pluralisation, lazy namespace
loading and ICU message syntax. This site needs none of those: a few dozen
strings, no plural-sensitive counts in prose, and content already centralised in
`src/data/**`. The whole implementation is ~150 lines — a provider, a context, a
hook and three dictionaries — against roughly 40 kB of dependency.

What makes it safe rather than merely small:

- `en.ts` is the source of truth. `type Dictionary` is derived from it (with
  literal types widened back to `string`), so `it.ts` and `de.ts` are
  **typechecked for completeness**. A missing or misspelt key fails the build.
- Locale resolution is synchronous in the state initialiser — stored choice,
  then `navigator.languages`, then English — so the first paint is already in
  the right language instead of flashing English.
- `<html lang>` is kept in sync; it drives screen-reader pronunciation and
  hyphenation.
- Every `localStorage` access is wrapped: private windows and blocked site data
  make it _throw_, not merely return null.

All three dictionaries ship in the main bundle (~12 kB combined). Lazy-loading
them would trade that for a flash of the wrong language — a bad trade at this
size. Revisit if a locale grows large or a fourth language lands.

**Not done:** locale-prefixed URLs (`/it/progetti`) and `hreflang`. Those need
per-locale HTML at crawl time, which means pre-rendering — see § SEO. Today the
language is a client-side preference, which is right for humans and invisible to
crawlers.

## Generated data

The curriculum under `/knowledge` is generated, never hand-written:

```
archive manifest.json → scripts/sync-archive.mjs → src/data/generated/
```

This is the build-time sync path that § GitHub describes, arriving earlier than
planned because the archive already publishes its own manifest — so no GitHub
API calls, no rate limits, no auth.

Output is **committed**. That keeps `npm run build` offline, reproducible and
independent of GitHub being up, at the cost of the data being as fresh as the
last `npm run sync:archive`. For material that changes a few times a semester,
that is the right side of the trade.

Per-subject trees are separate files loaded through `import.meta.glob` without
`eager`, so Vite emits one chunk per subject. Opening one subject downloads
~2–8 kB gzip rather than the ~1 MB the combined tree would cost.

The script has no dependencies — Node's built-in `fetch` and `fs`.

## SEO

Crawler-facing metadata (`title`, `description`, OpenGraph, Twitter) is static
in `index.html`, because crawlers do not execute JavaScript. Per-route document
titles are set at runtime by `useDocumentTitle` — enough for browser tabs and
history, but _not_ a substitute for real per-route metadata.

Genuine per-route OG tags require pre-rendering or SSG, not a head-management
library. That is a real architectural change and should be made deliberately, if
per-project link previews ever matter.

The deployed origin lives in `site.config.json` — one file, read by three
consumers: `vite.config.ts` (which replaces `%SITE_URL%` in index.html at build
time), `src/data/site.ts`, and the sitemap generator. A custom domain later is a
one-line change.

`scripts/generate-sitemap.mjs` runs after `vite build` and emits
`dist/sitemap.xml` plus a `dist/robots.txt` carrying the absolute `Sitemap:`
line. Routes come from the static list, the generated archive index, and the
project slugs. That last one is extracted from TypeScript with a regex — the
weak link — so the script **fails the build** if the counts drop below the
expected minimum, rather than shipping a sitemap quietly missing pages.

## Testing

Vitest + React Testing Library in jsdom. Tests target the things that would
actually cause harm if broken, rather than chasing coverage:

- **Data invariants** — private repositories never leak a URL, evidence links
  exist, referenced project ids resolve, ordering is deterministic.
- **Rendering contracts** — only confirmed socials render; every link has an
  accessible name and a safe `rel`.
- **Routing** — each route renders, unknown slugs fall through to 404, every
  page has exactly one `h1` and a main landmark.

Queries are by role and accessible name, so a11y regressions tend to break tests.

**Playwright is prepared for, not installed.** Nothing blocks it: the build
produces a static site servable by `npm run preview`, and Vitest's `include` is
scoped to `src/**/*.{test,spec}.{ts,tsx}`, so an `e2e/` directory will not be
picked up by the unit runner. Adding it later is `npm i -D @playwright/test`
plus a config — no restructuring.

## Accessibility

Treated as a build requirement:

- `eslint-plugin-jsx-a11y` runs in CI (and dictated the ESLint version pin).
- Semantic landmarks: one `main`, sections labelled by their own headings, a
  skip link as the first focusable element.
- Focus is never removed — `:focus-visible` styling is global, so pointer users
  do not see rings but keyboard users always do.
- Navigation uses real `<a>`/`<Link>`, never buttons with click handlers, so
  middle-click and "open in new tab" work.
- Hover styling is always paired with `focus-within` on cards, so keyboard users
  get the same affordance.
- Reduced motion has two layers: a global CSS override, and
  `usePrefersReducedMotion` for JS-driven animation, which CSS cannot reach.
  The hook uses `useSyncExternalStore` so it reads correctly on first render
  rather than flashing the animated branch.

## Performance

No webfonts, no hero media, no analytics, no third-party requests. The only
network cost is HTML, one CSS file (~4 kB gzip) and one JS bundle (~83 kB gzip).

`build.chunkSizeWarningLimit` is set just above the current baseline so the
warning means "you regressed" rather than firing on every normal build.

## Privacy

No analytics, no cookies, no third-party embeds, no outbound requests beyond the
user clicking a link. If analytics are ever wanted, the choice gets documented
before it is implemented, and it must be cookieless and privacy-respecting.
