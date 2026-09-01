import type { LocalizedText } from '@/i18n';
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
  /** A name is not translated. */
  name: 'Samuele Corrà',

  role: {
    en: 'Cybersecurity · Software Engineering · AI',
    it: 'Cybersecurity · Ingegneria del software · AI',
    de: 'Cybersicherheit · Software Engineering · KI',
  } satisfies LocalizedText,

  tagline: {
    en: 'I build software and document what I learn.',
    it: 'Costruisco software e documento quello che imparo.',
    de: 'Ich baue Software und dokumentiere, was ich lerne.',
  } satisfies LocalizedText,

  description: {
    en: 'Personal technical hub of Samuele Corrà: projects, a public cybersecurity knowledge archive, and links to the evidence behind them.',
    it: 'Hub tecnico personale di Samuele Corrà: progetti, un archivio pubblico di conoscenze in cybersecurity e i link alle prove che li sostengono.',
    de: 'Persönlicher technischer Hub von Samuele Corrà: Projekte, ein öffentliches Cybersecurity-Wissensarchiv und die Belege dahinter.',
  } satisfies LocalizedText,

  /** TODO(owner): production domain not decided yet. Absolute URLs depend on it. */
  url: null as Unconfirmed<string>,

  repositoryUrl: PORTFOLIO_REPOSITORY_URL as Unconfirmed<string>,

  /** TODO(owner): confirm the public contact address. */
  email: null as Unconfirmed<string>,

  ogImage: '/og-image.png',
} as const;

export type Site = typeof site;
