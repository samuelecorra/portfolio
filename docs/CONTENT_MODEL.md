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

## Knowledge

The deliberate anti-pattern here is the skill bar. `JavaScript 90%` is
unfalsifiable and means nothing. This model replaces it with two things a reader
can actually evaluate: **concrete topics** and **a link to the material**.

```ts
interface KnowledgeArea {
  id;
  slug;
  title;
  description;
  topics; // the honest replacement for a percentage
  relatedProjectIds; // must resolve to real Project ids (tested)
  evidence; // EvidenceLink[] — at least one (tested)
  tags;
  icon;
  order;
}

interface EvidenceLink {
  label;
  href;
  kind; // 'repository' | 'notes' | 'project' | 'external'
  repositoryPath; // Unconfirmed<string>
}
```

`repositoryPath` is separate from `href` on purpose. Today every area links to
the archive repository root and the path is `null`, because the archive's folder
layout has not been mapped — a deep link would be a guess. Filling these in
upgrades each card from "here is the repo" to "here is the exact folder", and
lets a future script verify the path still exists instead of shipping a dead
link.

Every area's evidence currently resolves to `ARCHIVE_REPOSITORY_URL`, exported
from `projects.ts` so the two data files cannot drift apart.

**If an area cannot point at evidence, it does not belong here.**

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
