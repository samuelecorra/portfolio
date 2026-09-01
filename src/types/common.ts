/**
 * Semantic icon names used across the data layer.
 *
 * The data files intentionally reference icons by NAME rather than importing
 * Lucide components directly. That keeps `src/data/**` free of React imports
 * and JSON-serialisable, which is what makes the planned build-time GitHub
 * sync (script -> generated JSON -> app) possible without a rewrite.
 * The name -> component mapping lives in `src/components/ui/Icon.tsx`.
 */
export type IconName =
  | 'github'
  | 'linkedin'
  | 'youtube'
  | 'x'
  | 'instagram'
  | 'mail'
  | 'external'
  | 'book'
  | 'shield'
  | 'database'
  | 'network'
  | 'code'
  | 'sigma';

/**
 * A value the owner has not confirmed yet.
 *
 * The codebase uses `null` — never `undefined` and never a fabricated string —
 * to mean "known unknown". Rendering code must branch on it explicitly, which
 * is what prevents placeholder text from leaking into the public site.
 */
export type Unconfirmed<T> = T | null;
