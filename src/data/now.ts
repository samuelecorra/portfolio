import type { Unconfirmed } from '@/types';

export interface NowEntry {
  id: string;
  kind: 'building' | 'studying' | 'exploring';
  title: string;
  detail: string;
  /** Optional link to the related project or evidence. */
  href: Unconfirmed<string>;
}

/**
 * The "Now" section: what is actually happening at the moment.
 *
 * Edit this file — and `lastUpdated` — rather than any component. A stale Now
 * section is worse than none, so the date is rendered alongside the entries.
 */
export const nowLastUpdated = '2026-09-01';

export const nowEntries: NowEntry[] = [
  {
    id: 'ironmath',
    kind: 'building',
    title: 'IronMath',
    detail: 'Building an AI-powered learning platform for STEM education.',
    href: 'https://ironmath.it',
  },
  {
    id: 'archive',
    kind: 'studying',
    title: 'Cybersecurity degree material',
    detail: 'Maintaining a public archive of notes, theory and exercises as the coursework grows.',
    href: '/knowledge',
  },
  {
    id: 'portfolio',
    kind: 'building',
    title: 'This website',
    detail: 'Designing and developing this site in public, alongside its documentation.',
    href: '/projects/portfolio',
  },
];
