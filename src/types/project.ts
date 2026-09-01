import type { IconName, Unconfirmed } from './common';

export type ProjectCategory = 'knowledge-archive' | 'product' | 'university' | 'website';

export type ProjectStatus = 'active' | 'in-progress' | 'maintained' | 'archived';

export type RepositoryVisibility = 'public' | 'private' | 'unpublished';

/**
 * Repository descriptor.
 *
 * `url` is non-null ONLY for `visibility: 'public'`. Private and unpublished
 * repositories carry `url: null`, so it is structurally impossible for a
 * component to render a source link to code that is not public.
 */
export interface ProjectRepository {
  visibility: RepositoryVisibility;
  url: Unconfirmed<string>;
}

export interface ProjectLink {
  label: string;
  href: string;
  /** `primary` renders as the filled CTA, `secondary` as the outlined one. */
  emphasis: 'primary' | 'secondary';
  icon: IconName;
}

export interface ProjectMedia {
  /** Path under /public or an imported asset URL. */
  src: string;
  /** Required: decorative-only project imagery is not acceptable here. */
  alt: string;
  width: number;
  height: number;
}

/**
 * Reserved for the future build-time GitHub sync. Always `null` in V1 — the
 * app makes no client-side GitHub requests. See docs/ARCHITECTURE.md § GitHub.
 */
export interface GitHubMetrics {
  stars: number;
  primaryLanguage: Unconfirmed<string>;
  /** ISO 8601 timestamp. */
  lastUpdated: string;
  topics: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  /** Compact label for nav, breadcrumbs and cards. */
  shortTitle: string;
  /** One sentence. Positioning, not a feature list. */
  summary: string;
  /**
   * Case-study paragraphs for /projects/:slug.
   * An empty array is valid and means "no case study written yet" — the detail
   * route degrades to metadata instead of showing invented prose.
   */
  description: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  /** e.g. '2024' or '2023 — present'. */
  period: Unconfirmed<string>;
  /** Verified technologies only. Empty = not yet documented. */
  technologies: string[];
  tags: string[];
  repository: ProjectRepository;
  website: Unconfirmed<string>;
  links: ProjectLink[];
  featured: boolean;
  /** Controls ordering and the large 01 / 02 / 03 index numerals. */
  order: number;
  media: Unconfirmed<ProjectMedia>;
  githubMetrics: Unconfirmed<GitHubMetrics>;
}
