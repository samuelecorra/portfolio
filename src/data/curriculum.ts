import archive from '@/data/generated/archive.json';
import { DEFAULT_LOCALE, type Locale } from '@/i18n';

/**
 * The university curriculum, backed by `generated/archive.json`.
 *
 * That file is produced by `scripts/sync-archive.mjs` from the archive's own
 * manifest — see docs/CONTENT_MODEL.md § Curriculum. Nothing here is typed by
 * hand except the subject name translations below.
 */

export interface SubjectCounts {
  files: number;
  notes: number;
  pdfs: number;
  code: number;
  images: number;
  other: number;
  lessons: number;
  directories: number;
  modules: number;
  units: number;
}

export interface CurriculumSubject {
  id: string;
  slug: string;
  /** Original directory name in the archive. */
  dirName: string;
  /** Italian title, derived from the directory name. */
  title: string;
  year: string;
  path: string;
  viewerUrl: string;
  githubUrl: string;
  counts: SubjectCounts;
}

export interface CurriculumYear {
  id: string;
  label: string;
  kind: string;
  order: number;
  subjects: CurriculumSubject[];
}

export interface ArchiveTotals extends SubjectCounts {
  subjects: number;
}

interface ArchiveShape {
  generatedAt: string;
  source: {
    repo: string;
    branch: string;
    githubUrl: string;
    viewerUrl: string;
    manifestGeneratedAt: string | null;
  };
  totals: ArchiveTotals;
  years: CurriculumYear[];
}

const data = archive as unknown as ArchiveShape;

/**
 * English and German names for each subject.
 *
 * The archive is Italian, so `subject.title` IS the Italian name — there is no
 * entry for `it` here. Anything missing falls back to the original title, which
 * is correct rather than blank.
 */
const SUBJECT_NAMES: Record<string, { en: string; de: string }> = {
  'anno1-analisi-1': { en: 'Calculus I', de: 'Analysis I' },
  'anno1-architettura-elaboratori': {
    en: 'Computer Architecture',
    de: 'Rechnerarchitektur',
  },
  'anno1-matematica-discreta': {
    en: 'Discrete Mathematics',
    de: 'Diskrete Mathematik',
  },
  'anno1-programmazione': { en: 'Programming', de: 'Programmierung' },
  'anno1-diritto-penale-informatico': {
    en: 'Computer Criminal Law',
    de: 'Informatikstrafrecht',
  },
  'anno1-programmazione-web-mobile': {
    en: 'Web & Mobile Programming',
    de: 'Web- und Mobile-Programmierung',
  },
  'anno1-aspetti-organizzativi-gestionali-cybersec': {
    en: 'Organisational & Managerial Aspects of Cybersecurity',
    de: 'Organisatorische und betriebliche Aspekte der Cybersicherheit',
  },
  'anno2-algoritmi-e-strutture-dati': {
    en: 'Algorithms & Data Structures',
    de: 'Algorithmen und Datenstrukturen',
  },
  'anno2-sistemi-operativi-1': { en: 'Operating Systems I', de: 'Betriebssysteme I' },
  'anno2-sistemi-operativi-2': { en: 'Operating Systems II', de: 'Betriebssysteme II' },
  'anno2-basi-di-dati': { en: 'Database Systems', de: 'Datenbanksysteme' },
  'anno2-reti-di-calcolatori': { en: 'Computer Networks', de: 'Rechnernetze' },
  'anno2-crittografia': { en: 'Cryptography', de: 'Kryptographie' },
  'anno2-statistica-e-analisi-dei-dati': {
    en: 'Statistics & Data Analysis',
    de: 'Statistik und Datenanalyse',
  },
  'anno3-computer-forensics': { en: 'Computer Forensics', de: 'Computer-Forensik' },
  'anno3-sicurezza-sistemi-e-reti': {
    en: 'Systems & Network Security',
    de: 'System- und Netzwerksicherheit',
  },
  'anno3-aspetti-etici-legali-sociali-ed-economici-dell-informatica': {
    en: 'Ethical, Legal, Social & Economic Aspects of Computing',
    de: 'Ethische, rechtliche, soziale und wirtschaftliche Aspekte der Informatik',
  },
  'anno3-gestione-della-sicurezza-nei-sistemi-informativi': {
    en: 'Information Systems Security Management',
    de: 'Sicherheitsmanagement in Informationssystemen',
  },
  'anno3-progettazione-di-software-sicuro': {
    en: 'Secure Software Design',
    de: 'Sicheres Software-Design',
  },
  'anno3-pss-corso-aggiornato': {
    en: 'Secure Software Design (updated course)',
    de: 'Sicheres Software-Design (aktualisierter Kurs)',
  },
  'anno3-sistemi-biometrici': { en: 'Biometric Systems', de: 'Biometrische Systeme' },
  'anno3-sicurezza-web-mobile': {
    en: 'Web & Mobile Security',
    de: 'Web- und Mobile-Sicherheit',
  },
  'extra-python-corso-completo': { en: 'Python (full course)', de: 'Python (Komplettkurs)' },
  'extra-scripting': { en: 'Scripting', de: 'Scripting' },
};

const YEAR_LABELS: Record<string, Record<Locale, string>> = {
  anno1: { en: 'Year 1', it: 'Primo anno', de: 'Erstes Jahr' },
  anno2: { en: 'Year 2', it: 'Secondo anno', de: 'Zweites Jahr' },
  anno3: { en: 'Year 3', it: 'Terzo anno', de: 'Drittes Jahr' },
  extra: { en: 'Extra', it: 'Extra', de: 'Extra' },
};

/** Localised subject name. Italian returns the archive's own title. */
export function subjectName(subject: CurriculumSubject, locale: Locale): string {
  if (locale === 'it') return subject.title;
  return SUBJECT_NAMES[subject.slug]?.[locale] ?? subject.title;
}

export function yearLabel(year: CurriculumYear, locale: Locale): string {
  return YEAR_LABELS[year.id]?.[locale] ?? YEAR_LABELS[year.id]?.[DEFAULT_LOCALE] ?? year.label;
}

export function getCurriculumYears(): CurriculumYear[] {
  return data.years;
}

/** Degree years only — the `extra` bucket is self-directed material. */
export function getDegreeYears(): CurriculumYear[] {
  return data.years.filter((year) => year.kind === 'year');
}

export function getAllSubjects(): CurriculumSubject[] {
  return data.years.flatMap((year) => year.subjects);
}

export function getSubjectBySlug(slug: string): CurriculumSubject | undefined {
  return getAllSubjects().find((subject) => subject.slug === slug);
}

/** The subjects with the most material — used for the homepage preview. */
export function getTopSubjects(limit: number): CurriculumSubject[] {
  return [...getAllSubjects()]
    .sort((a, b) => b.counts.notes - a.counts.notes || b.counts.files - a.counts.files)
    .slice(0, limit);
}

export const archiveTotals: ArchiveTotals = data.totals;
export const archiveSource = data.source;
export const archiveGeneratedAt = data.generatedAt;
