# Design System

The visual language: technical, dark, precise, highly readable. Cybersecurity
identity comes from content and craft — **not** from Matrix rain, terminal
green, binary wallpaper or skulls. Those are explicitly out of scope.

> **Status:** the token layer and layout primitives are in place. The expressive
> visual pass (cursor-reactive cards, border illumination, depth, route
> transitions) is the next phase. Components today are structurally correct and
> deliberately restrained.

## Where tokens live

`src/styles/index.css`, in Tailwind v4 `@theme` blocks. There is no
`tailwind.config.js`. Each token generates a CSS custom property _and_ the
matching utility, so `--color-surface` gives you `bg-surface`, `text-surface`,
`border-surface`.

**Change colours here and nowhere else.** No hex values in components.

> **Naming trap:** every `--color-<name>` token also generates a `text-<name>`
> utility. Never name a colour after a built-in Tailwind scale value — a token
> called `base` shadows the `text-base` _font size_ and silently paints text in
> that colour. This bit us once; `--color-canvas` is the renamed survivor.

## Colour

Near-black ground, graphite surfaces, one electric-blue accent. Colour carries
meaning; it is not decoration.

### Surfaces

| Token                     | Value     | Use                                |
| ------------------------- | --------- | ---------------------------------- |
| `--color-canvas`          | `#07080b` | Page ground                        |
| `--color-surface`         | `#0d0f14` | Cards, panels                      |
| `--color-surface-raised`  | `#14171e` | Chips, icon wells, nested surfaces |
| `--color-surface-overlay` | `#1a1e27` | Menus, popovers                    |

### Borders

| Token                 | Value     | Use                              |
| --------------------- | --------- | -------------------------------- |
| `--color-line`        | `#1e232c` | Default separators, card borders |
| `--color-line-strong` | `#2a313d` | Hover / focus emphasis           |

### Text

| Token               | Value     | Contrast on base | Use                    |
| ------------------- | --------- | ---------------- | ---------------------- |
| `--color-ink`       | `#e9edf4` | 17.1:1           | Headings, primary text |
| `--color-ink-muted` | `#9aa4b4` | 7.96:1           | Body, descriptions     |
| `--color-ink-faint` | `#7b8494` | 5.31:1           | Metadata, labels       |

All three clear WCAG AA (4.5:1) for normal text. Ratios above are against
`--color-canvas`; the worst real case in the UI is `--color-ink-faint` on
`--color-surface-raised` at **4.76:1**, which still passes.

`--color-ink-faint` sits at `#7b8494` rather than something dimmer specifically
to keep that worst case above the line — do not darken it without re-checking
every surface it appears on.

### Accent

| Token                   | Value     | Contrast on base | Use                         |
| ----------------------- | --------- | ---------------- | --------------------------- |
| `--color-accent`        | `#3abeff` | 9.53:1           | Links, focus ring, eyebrows |
| `--color-accent-strong` | `#12a6f0` | —                | Hover on filled buttons     |
| `--color-accent-dim`    | `#1d6c95` | —                | Subdued accent, glows       |

Filled accent buttons put `--color-canvas` text on `--color-accent` (9.53:1), and
on `--color-accent-strong` when hovered (7.38:1).

Status colours (`--color-status-active`, `--color-status-paused`) exist for
project state and should not be used for general UI.

## Typography

**System fonts.** No webfont request, no FOUT, no layout shift, one less
third-party dependency. A display face can be introduced later behind
`--font-sans` without touching components.

- `--font-sans` — all UI and prose.
- `--font-mono` — index numerals, eyebrows, topic chips, metadata labels. Mono
  is the site's main texture cue: it reads as technical without costume.

Conventions:

- One `h1` per page. Sections use `h2`; cards inside them use `h3`. Heading
  level is never chosen for visual size — use classes for that.
- Eyebrow labels: `font-mono text-xs uppercase tracking-[0.2em] text-accent`.
- `text-wrap: balance` on `h1`–`h3`, `text-wrap: pretty` on paragraphs.

## Spacing and layout

Tailwind's default 4px-based spacing scale — no custom scale, because none was
needed.

- **Container:** `max-w-6xl` with `px-5 / sm:px-8 / lg:px-12`. Defined once in
  `components/layout/Container.tsx`; that is the site's horizontal rhythm.
- **Section rhythm:** `py-16 / sm:py-20 / lg:py-24`, via
  `components/layout/Section.tsx`.
- **Hero:** larger — `py-20 / sm:py-28 / lg:py-36`.
- **Card padding:** `p-6`, `sm:p-8` on feature cards.

## Surfaces and borders

The default card is:

```
rounded-(--radius-card)  border border-line  bg-surface  p-6
```

with `hover:border-line-strong` **and** `focus-within:border-line-strong`.

`--radius-card` is `0.875rem`. Smaller elements use Tailwind's `rounded-md` /
`rounded-lg`.

## Motion

Few curves, used consistently. Motion tokens are declared in a `@theme static`
block so they survive tree-shaking even when referenced only from JS.

| Token             | Value                            | Use                          |
| ----------------- | -------------------------------- | ---------------------------- |
| `--duration-fast` | `150ms`                          | Hover, focus, colour swaps   |
| `--duration-base` | `250ms`                          | Card and surface states      |
| `--duration-slow` | `400ms`                          | Entrances, route transitions |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)`  | Entrances — decisive         |
| `--ease-out-soft` | `cubic-bezier(0.33, 1, 0.68, 1)` | Small UI moves               |

Rules:

1. **Nothing exceeds 400ms.** Longer reads as latency, not polish.
2. **Animate `transform` and `opacity`.** Not layout properties.
3. **Motion must mean something** — state change, arrival, focus. No ambient
   movement.
4. **Reduced motion is honoured twice.** CSS handles declarative animation
   globally; JS-driven animation (Motion) must gate on
   `usePrefersReducedMotion()`, which CSS cannot reach.
5. **Animation is never load-bearing.** With motion disabled, nothing is lost.

## Interaction and focus

- Global `:focus-visible` = 2px `--color-accent` outline, 2px offset. Never
  removed. Pointer users do not see it; keyboard users always do.
- The skip link is the first focusable element on every page, hidden until
  focused (`.skip-link` utility).
- **Every hover affordance has a non-hover equivalent.** Cards pair `hover:`
  with `focus-within:`. Nothing is reachable by hover alone — this is what keeps
  the design usable on touch, which is most visitors.

## Responsiveness

Mobile-first. Tailwind's default breakpoints, mainly `sm` (640), `md` (768) and
`lg` (1024).

- Navigation collapses below `md` to a disclosure menu driven by
  `aria-expanded` / `aria-controls`, toggled with the `hidden` attribute so the
  ARIA state and the DOM state cannot drift.
- Project grids: 1 column → 2 at `md`. Knowledge grids: 1 → 2 at `md` → 3 at `lg`.
- Type scales at `sm`/`lg` only; no fluid clamp until a real need appears.

## Iconography

- **UI icons:** `lucide-react`, imported individually so they tree-shake.
- **Brand marks:** inlined SVG in `components/ui/BrandIcon.tsx`. lucide-react 1.x
  removed brand icons; GitHub, YouTube, X and Instagram use official Simple Icons
  paths (CC0-1.0), and LinkedIn is hand-drawn because Simple Icons withdrew it at
  LinkedIn's request.
- Icons are always `aria-hidden`. The accessible name comes from the control
  wrapping them — an icon is never the only label.
