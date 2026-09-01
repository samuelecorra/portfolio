import type { Unconfirmed } from '@/types';

/**
 * Central site configuration. Anything that appears in metadata, the footer,
 * or the document title resolves from here.
 */
export const site = {
  name: 'Samuele Corrà',
  /** Short, technical, not a job title. Owner-editable copy. */
  role: 'Cybersecurity & software engineering',
  tagline: 'I build things, and I publish the evidence.',
  description:
    'Personal technical hub of Samuele Corrà: projects, a public cybersecurity knowledge archive, and links to the evidence behind them.',

  /** TODO(owner): production domain not decided yet. Absolute URLs depend on it. */
  url: null as Unconfirmed<string>,

  /** TODO(owner): this repository is not published yet. */
  repositoryUrl: null as Unconfirmed<string>,

  /** TODO(owner): confirm the public contact address. */
  email: null as Unconfirmed<string>,

  locale: 'en',
  ogImage: '/og-image.svg',
} as const;

export type Site = typeof site;
