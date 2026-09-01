import type { LocalizedText } from '@/i18n';
import type { Unconfirmed } from '@/types';

export interface NowEntry {
  id: string;
  kind: 'building' | 'studying' | 'exploring';
  title: LocalizedText;
  detail: LocalizedText;
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
    title: { en: 'IronMath', it: 'IronMath', de: 'IronMath' },
    detail: {
      en: 'Building an AI-powered learning platform for STEM education.',
      it: 'Sto costruendo una piattaforma di apprendimento con AI per la didattica STEM.',
      de: 'Ich baue eine KI-gestützte Lernplattform für die MINT-Ausbildung.',
    },
    href: 'https://ironmath.it',
  },
  {
    id: 'archive',
    kind: 'studying',
    title: {
      en: 'Cybersecurity degree material',
      it: 'Materiale della laurea in cybersecurity',
      de: 'Material des Cybersecurity-Studiums',
    },
    detail: {
      en: 'Maintaining a public archive of notes, theory and exercises as the coursework grows.',
      it: 'Mantengo un archivio pubblico di appunti, teoria ed esercizi man mano che il corso cresce.',
      de: 'Ich pflege ein öffentliches Archiv aus Notizen, Theorie und Übungen, während der Kurs wächst.',
    },
    href: '/knowledge',
  },
  {
    id: 'portfolio',
    kind: 'building',
    title: { en: 'This website', it: 'Questo sito', de: 'Diese Website' },
    detail: {
      en: 'Designing and developing this site in public, alongside its documentation.',
      it: 'Progetto e sviluppo questo sito in pubblico, insieme alla sua documentazione.',
      de: 'Ich entwerfe und entwickle diese Website öffentlich, samt Dokumentation.',
    },
    href: '/projects/portfolio',
  },
];
