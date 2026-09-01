import type { LocalizedList, LocalizedText } from '@/i18n';

import type { IconName, Unconfirmed } from './common';

export type ProjectCategory = 'knowledge-archive' | 'product' | 'university' | 'website';

export type ProjectStatus = 'active' | 'in-progress' | 'maintained' | 'archived';

export type RepositoryVisibility = 'public' | 'private' | 'unpublished';

/**
 * Editorial weight, not a CSS class.
 *
 * Projects do not deserve equal visual space: the knowledge archive is the
 * site's central proof and gets the full-width treatment, while the portfolio's
 * own card is a footnote. Components map this to a layout; data only states
 * importance. See docs/CONTENT_MODEL.md.
 */
export type ProjectEmphasis = 'primary' | 'standard' | 'minor';

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
  summary: LocalizedText;
  /**
   * Case-study paragraphs for /projects/:slug, per locale.
   * Empty arrays are valid and mean "no case study written yet" — the detail
   * route degrades to metadata instead of showing invented prose.
   */
  description: LocalizedList;
  category: ProjectCategory;
  emphasis: ProjectEmphasis;
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
