import type { Unconfirmed } from '@/types';

/**
 * Canonical URL of this site's own repository.
 *
 * Declared here rather than in `projects.ts` because it is site identity first
 * (the footer's source link) and a project second. `projects.ts` imports it for
 * the portfolio's own card, so the two can never disagree.
 */
export const PORTFOLIO_REPOSITORY_URL = 'https://github.com/samuelecorra/portfolio';

/**
 * Central site configuration. Anything that appears in metadata, the footer,
 * or the document title resolves from here.
 */
export const site = {
  name: 'Samuele Corrà',
  /** Short, technical, not a job title. */
  role: 'Cybersecurity · Software Engineering · AI',
  tagline: 'I build software and document what I learn.',
  description:
    'Personal technical hub of Samuele Corrà: projects, a public cybersecurity knowledge archive, and links to the evidence behind them.',

  /** TODO(owner): production domain not decided yet. Absolute URLs depend on it. */
  url: null as Unconfirmed<string>,

  repositoryUrl: PORTFOLIO_REPOSITORY_URL as Unconfirmed<string>,

  /** TODO(owner): confirm the public contact address. */
  email: null as Unconfirmed<string>,

  locale: 'en',
  ogImage: '/og-image.png',
} as const;

export type Site = typeof site;
