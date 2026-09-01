# Content Model

All content lives in `src/data/**`. Components render it; they never contain it.

The practical test: **adding a project should mean adding one object, not
editing components.** If that stops being true, the model is wrong.

## Files

| File           | Holds                                        |
| -------------- | -------------------------------------------- |
| `site.ts`      | Identity, tagline, domain, repo URL, contact |
| `projects.ts`  | The project collection + selectors           |
| `knowledge.ts` | Competence areas and their evidence links    |
| `socials.ts`   | Profile links                                |
| `now.ts`       | Current focus, with a `lastUpdated` date     |
| `about.ts`     | About-page prose and principles              |

Types are in `src/types/` and re-exported from `src/types/index.ts`.

## The rule that matters: unknown ≠ invented

The site's whole premise is that claims are backed by evidence, so fabricated
content is a correctness bug, not a cosmetic one.

```ts
export type Unconfirmed<T> = T | null;
```

`null` means "the owner has not confirmed this yet". Not `undefined`, not `''`,
not a plausible-looking guess.

Rendering code must branch on it:

| Unknown value             | What the UI does                                    |
| ------------------------- | --------------------------------------------------- |
| Social `url` is `null`    | Platform omitted entirely — no dead icon            |
| `description` is `[]`     | "A detailed case study has not been written yet."   |
| `technologies` is `[]`    | Technology list not rendered at all                 |
| `period` is `null`        | "Not specified"                                     |
| `site.repositoryUrl` null | Footer says "source coming soon" instead of linking |

Unresolved values are marked `TODO(owner)` in source and listed in
[`BOOTSTRAP_PLAN.md`](../BOOTSTRAP_PLAN.md#open-questions-for-the-owner).

## Projects

```ts
interface Project {
  id;
  slug;
  title;
  shortTitle;
  summary; // one sentence, positioning — used on cards
  description; // case-study paragraphs; [] is valid
  category; // 'knowledge-archive' | 'product' | 'university' | 'website'
  status; // 'active' | 'in-progress' | 'maintained' | 'archived'
  period; // Unconfirmed<string>
  technologies; // verified only; [] means "not documented yet"
  tags;
  repository; // { visibility, url }
  website; // Unconfirmed<string>
  links; // ProjectLink[] — the CTAs
  featured;
  order;
  media; // Unconfirmed<ProjectMedia> — alt text is required, not optional
  githubMetrics; // Unconfirmed<GitHubMetrics> — always null in V1
}
```

### Private projects

This is the part worth understanding before editing.

```ts
interface ProjectRepository {
  visibility: 'public' | 'private' | 'unpublished';
  url: Unconfirmed<string>;
}
```

`url` is non-null **only** when `visibility === 'public'`. A private repository
has nothing to link, so it carries `null` — making it structurally impossible
for a component to render a source link to closed code.

IronMath is the case this protects: it ships `visibility: 'private'`,
`url: null`, and its only CTA points at `https://ironmath.it`.

`src/data/projects.test.ts` enforces this: no non-public project may carry a URL,
and none may have a `github.com` link anywhere in `links`.

A public case study can still be written for a private product — problem,
architecture, role, decisions, outcomes — without exposing source. That belongs
in `description`, subject to the owner's disclosure boundary.

### Emphasis

Projects do not deserve equal visual space, so the data says how much each one
matters and the component decides what that looks like:

| `emphasis`   | Footprint            | Used for                                      |
| ------------ | -------------------- | --------------------------------------------- |
| `'primary'`  | Full width, enlarged | The knowledge archive — the site's core proof |
| `'standard'` | Half width           | IronMath, CyberCuisine                        |
| `'minor'`    | Full width, compact  | This site's own card — a footnote             |

`emphasis` is _editorial weight_, not a CSS class: the data states importance,
`ProjectCard` maps it to a layout, and the grid stays a dumb two-column
container. The featured card additionally renders its subject tags, because
breadth is the thing worth showing for an archive.

A test asserts that **exactly one** project is `'primary'` — two would read as no
hierarchy at all.

### Links

`ProjectLink.href` beginning with `/` is an internal route; anything else is
external and gets `target="_blank" rel="noopener noreferrer"` plus an
external-link cue. `ActionLink` decides this via `src/lib/links.ts` — components
never hand-roll it.

`emphasis: 'primary'` renders the filled CTA; `'secondary'` the outlined one.

The knowledge archive uses both, deliberately:

- **Explore archive** → `/knowledge` (the curated internal index)
- **View source on GitHub** → the repository

### Selectors

`getAllProjects()`, `getFeaturedProjects()` (both sorted by `order`),
`getProjectBySlug()`, `getProjectsByIds()`. Components use these rather than
sorting or filtering inline, so ordering rules live in one place.

## Language

Three locales: English (source and fallback), Italian, German.

Two kinds of text, treated differently:

**Drafting order is Italian first.** Copy is written in `it` and translated
into `en` and `de` from there, never the reverse — the underlying material and
the owner's voice are both Italian, and drafting in English loses nuance.
English remains the _technical_ fallback locale and `en.ts` still defines the
`Dictionary` type; that is an implementation detail, not a drafting order.

**Editorial copy** — hero, project summaries, principles, UI chrome — is
translated. In data it uses `LocalizedText` / `LocalizedList`
(`Record<Locale, string>`), and UI strings live in `src/i18n/{en,it,de}.ts`.
`en.ts` defines the `Dictionary` type, so a missing key in another locale is a
typecheck failure rather than a blank string in production.

**Source artefacts** — archive folder names, module and lesson titles — are
NOT translated. They are the actual names of files in the repository, written in
Italian. Translating them would mean the label on screen no longer matches what
the reader finds when they follow the link. Subject names are the one exception:
they carry curated English and German names, and the Italian original is shown
underneath so the connection to the folder stays visible.

Tests assert that all three dictionaries have identical key sets, that none
contains an empty string, and that Italian and German actually differ from
English — which catches a locale file copy-pasted and never translated.

## Curriculum

`/knowledge` is the site's strongest claim, so none of it is hand-written.

```
archive manifest.json  →  scripts/sync-archive.mjs  →  src/data/generated/
```

`npm run sync:archive` fetches the archive's own generated manifest, walks the
6,110-file tree and writes:

- **`generated/archive.json`** — years, subjects and counts. Small, bundled.
- **`generated/subjects/<slug>.json`** — one file per subject holding the full
  module → unit → lesson tree. Loaded lazily via `import.meta.glob`, so opening
  Cryptography downloads Cryptography, not all 24 subjects.

Output is committed so builds stay offline and reproducible.

### Why generated

The archive holds three years of material: 24 subjects, 167 modules, 287
didactic units, 1,558 lessons, 2,012 notes, 364 PDFs, 6,110 files. Numbers that
size, typed by hand, are wrong by the next commit to the archive — and a site
whose whole premise is "evidence over assertions" cannot ship figures nobody can
reproduce. Re-running the script is the only way these change.

### Structure is not uniform

Subjects file their material differently. Most use `M01_Module/UD1 - Unit/L1 -
Lesson.md`; some nest a course level first; a few store loose files with no
module structure at all. The generator therefore builds a **generic tree** and
classifies nodes by naming pattern where one exists, rather than assuming a
fixed depth — an assumption would silently drop the subjects that do not match.

Consequently the UI only renders metrics a subject actually has. A zero would
read as "no work here" when it really means "filed differently".

Images are excluded from the per-subject trees: 2,725 screenshots and diagrams
are supporting assets, not material anyone browses by name, and including them
would triple the lazy chunk for no informational gain.

### Subject prose

Two layers, deliberately split by where they are needed:

- **`subjectSummaries.ts`** — one paragraph per subject, shown on the
  `/knowledge` cards. Bundled, because the index needs all 24 at once.
- **`essays/anno{1,2,3}.ts`** — three to five paragraphs per subject, shown on
  the detail page between the metrics and the action buttons. Aggregated by
  `subjectEssays.ts` and imported dynamically, so the ~44 kB gzip of prose only
  loads on `/knowledge/:slug`.

The cards deliberately show **no counts**. Numbers without context read as
filler on an index; they belong on the detail page where the tree gives them
meaning.

Both layers are written from the archive's actual structure — module, unit and
lesson titles read directly from the repository — not from general knowledge
about the subject. If a topic is named, a lesson covering it exists. Tests
enforce that every subject has both layers in all three locales, that paragraph
counts match across locales (a mismatch means a paragraph was lost in
translation), and that no entry points at a subject that no longer exists.

### Deep links

Each subject carries two URLs, both generated and both verified to resolve:

- `viewerUrl` — the archive's own deployed viewer, using its hash-routing
  scheme (`#/anno2/6_Crittografia`).
- `githubUrl` — the repository tree.

The tree component builds per-node URLs from the ancestor path, so an individual
lesson links to that lesson.

## Icons

Data references icons by semantic name (`'github'`, `'database'`), never by
importing a component. `src/components/ui/Icon.tsx` maps names to components.

This keeps `src/data/**` free of React imports and fully serialisable — the
prerequisite for the planned build-time GitHub sync writing JSON in these same
shapes. Adding an icon means extending `IconName` in `src/types/common.ts` and
the map in `Icon.tsx`; TypeScript will point at anything missed.

## Adding things

**A project** — append to `projects`, set a unique `id`/`slug` and an `order`.
Set `repository.visibility` accurately. Leave unknowns `null` or `[]`. It appears
on `/projects`, gets `/projects/<slug>`, and appears on the homepage if
`featured: true`.

**A knowledge area** — append to `knowledgeAreas` with at least one topic and one
evidence link. `relatedProjectIds` must reference real project ids; the tests
check both.

**A social link** — fill in `url` in `socials.ts`. It appears everywhere socials
render, automatically.

**A nav route** — add the route in `src/app/AppRoutes.tsx` and an entry in
`src/components/navigation/navItems.ts`.
