/**
 * English dictionary — the source of truth.
 *
 * Its shape defines the `Dictionary` type that every other locale must satisfy,
 * so a missing or misspelled key in it.ts / de.ts is a typecheck failure rather
 * than a blank string in production.
 */
export const en = {
  nav: {
    label: 'Primary',
    projects: 'Projects',
    knowledge: 'Knowledge',
    about: 'About',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    skipToContent: 'Skip to content',
  },
  hero: {
    intro:
      'A technical hub rather than a CV: what I build, what I study, and the material behind both. Every claim here links to something you can read.',
    ctaWork: 'Explore my work',
    ctaGithub: 'GitHub',
  },
  work: {
    eyebrow: 'Proof of work',
    title: 'Selected work',
    description:
      'Things I build or maintain. Each one links to the work itself, not a description of it.',
    all: 'All projects',
    indexTitle: 'Projects',
    indexDescription: 'Everything currently published, newest focus first.',
    featured: 'Featured',
    technologies: 'Technologies',
    subjects: 'Subjects covered',
    back: 'All projects',
    noCaseStudy: 'A detailed case study for this project has not been written yet.',
    status: 'Status',
    period: 'Period',
    source: 'Source',
    notSpecified: 'Not specified',
  },
  status: {
    active: 'Active',
    'in-progress': 'In progress',
    maintained: 'Maintained',
    archived: 'Archived',
  },
  repository: {
    public: 'Public repository',
    private: 'Private repository',
    unpublished: 'Not published yet',
  },
  knowledge: {
    eyebrow: 'Knowledge',
    title: 'What I actually know',
    description:
      'Competence as concrete topics rather than percentages. Every claim links to evidence.',
    all: 'Full knowledge index',
    indexEyebrow: 'Knowledge index',
    indexTitle: 'Three years, in full',
    indexDescription:
      'The complete curriculum of my cybersecurity degree, generated directly from the public archive. Every subject links to the material itself.',
    curriculumNote:
      'Counts are generated from the archive at build time, never typed by hand — run npm run sync:archive to refresh them.',
    exploreArchive: 'Explore archive',
    viewInArchive: 'Open in archive',
    viewOnGithub: 'View on GitHub',
    backToIndex: 'All subjects',
    sourceLanguage: 'Course material is in Italian.',
    contents: 'Contents',
    noStructure: 'This subject stores its material as files rather than a module structure.',
  },
  metrics: {
    subjects: 'subjects',
    modules: 'modules',
    units: 'didactic units',
    lessons: 'lessons',
    notes: 'notes',
    pdfs: 'PDFs',
    code: 'code files',
    files: 'files',
    directories: 'folders',
    years: 'years',
  },
  now: {
    eyebrow: 'Now',
    title: "What I'm working on",
    description: 'Current focus, kept deliberately short and dated.',
    building: 'Building',
    studying: 'Studying',
    exploring: 'Exploring',
    details: 'Details',
    lastUpdated: 'Last updated',
    moreAbout: 'More about',
  },
  findMe: {
    eyebrow: 'Find me',
    title: 'Elsewhere',
    description:
      'Professional history lives on LinkedIn. The technical side lives here and on GitHub.',
  },
  about: {
    title: 'About',
    principles: 'Principles',
    elsewhere: 'Elsewhere',
    elsewhereDescription: 'Professional history lives on LinkedIn. Samuele Corrà elsewhere:',
  },
  footer: {
    sourceOnGithub: 'Source on GitHub',
    builtInPublic: 'Built in public — source repository coming soon.',
  },
  notFound: {
    title: 'Page not found',
    description: 'That route does not exist. It may have been renamed or never published.',
    cta: 'Back to home',
  },
} as const;

/**
 * Widens the literal types produced by `as const` back to `string`, while
 * keeping the key structure exact. Without this, `const it: Dictionary` would
 * demand the literal English strings rather than Italian ones.
 */
type Widen<T> = { [K in keyof T]: T[K] extends string ? string : Widen<T[K]> };

/** Every other locale must match this shape exactly — enforced at typecheck. */
export type Dictionary = Widen<typeof en>;
