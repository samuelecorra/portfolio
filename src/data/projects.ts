import type { Project } from '@/types';

import { PORTFOLIO_REPOSITORY_URL } from './site';

/**
 * The project collection.
 *
 * Adding a project = adding one object here. No component edits required.
 *
 * Conventions:
 * - `links[].href` starting with '/' is an internal route; anything else is
 *   treated as external and rendered with rel/target and an external-link cue.
 * - Unknown metadata is `null` or `[]`, never invented. See docs/CONTENT_MODEL.md.
 */
/**
 * Canonical URL of the knowledge archive repository.
 * Exported because `src/data/knowledge.ts` points every evidence link at it —
 * one definition, so the two data files can never drift apart.
 */
export const ARCHIVE_REPOSITORY_URL = 'https://github.com/samuelecorra/cybersec_unimi_ssri2.0';

export const projects: Project[] = [
  {
    id: 'cybersec-archive',
    slug: 'cybersecurity-knowledge-archive',
    title: 'Cybersecurity Knowledge Archive',
    shortTitle: 'Knowledge Archive',
    summary: {
      en: 'A public, inspectable archive of the theory, notes, exercises and exam preparation built across a cybersecurity degree.',
      it: 'Un archivio pubblico e ispezionabile di teoria, appunti, esercizi e preparazione agli esami costruito lungo tutta la laurea in cybersecurity.',
      de: 'Ein öffentliches, einsehbares Archiv aus Theorie, Notizen, Übungen und Prüfungsvorbereitung, entstanden über ein ganzes Cybersecurity-Studium.',
    },
    description: {
      en: [
        'This is the material behind the claims made elsewhere on this site: lecture notes, worked exercises, theory write-ups and exam preparation, kept in the open and versioned.',
        'It spans cybersecurity, networking, databases, operating systems, cryptography, mathematics, statistics and core computer science — organised so that a reader can go straight to a subject and judge the depth for themselves.',
        'It is published deliberately. Anyone assessing technical background should be able to read the actual work rather than take a bullet point on trust.',
      ],
      it: [
        'Questo è il materiale dietro le affermazioni fatte altrove su questo sito: appunti delle lezioni, esercizi svolti, sintesi teoriche e preparazione agli esami, tenuti in chiaro e versionati.',
        'Copre cybersecurity, reti, basi di dati, sistemi operativi, crittografia, matematica, statistica e informatica di base — organizzato perché chi legge possa andare dritto a una materia e giudicarne la profondità da sé.',
        'È pubblicato di proposito. Chi valuta un background tecnico dovrebbe poter leggere il lavoro vero, non fidarsi di un elenco puntato.',
      ],
      de: [
        'Das ist das Material hinter den Aussagen auf dieser Website: Vorlesungsnotizen, gelöste Übungen, Theorieausarbeitungen und Prüfungsvorbereitung — offen und versioniert.',
        'Es umfasst Cybersicherheit, Netzwerke, Datenbanken, Betriebssysteme, Kryptographie, Mathematik, Statistik und Informatik-Grundlagen — so gegliedert, dass man direkt zu einem Fach springen und die Tiefe selbst beurteilen kann.',
        'Die Veröffentlichung ist Absicht. Wer einen technischen Hintergrund beurteilt, sollte die eigentliche Arbeit lesen können, statt einem Stichpunkt zu vertrauen.',
      ],
    },
    category: 'knowledge-archive',
    emphasis: 'primary',
    status: 'active',
    // TODO(owner): confirm the period this archive covers.
    period: null,
    // Notes and theory rather than a codebase — no technology list applies.
    technologies: [],
    tags: [
      'cybersecurity',
      'networking',
      'databases',
      'operating systems',
      'cryptography',
      'mathematics',
      'statistics',
      'computer science',
    ],
    repository: {
      visibility: 'public',
      url: ARCHIVE_REPOSITORY_URL,
    },
    website: null,
    links: [
      // Internal first: the knowledge index is the curated way in.
      { label: 'Explore archive', href: '/knowledge', emphasis: 'primary', icon: 'book' },
      {
        label: 'View source on GitHub',
        href: ARCHIVE_REPOSITORY_URL,
        emphasis: 'secondary',
        icon: 'github',
      },
    ],
    featured: true,
    order: 1,
    media: null,
    githubMetrics: null,
  },

  {
    id: 'ironmath',
    slug: 'ironmath',
    title: 'IronMath',
    shortTitle: 'IronMath',
    summary: {
      en: 'An AI-powered learning platform for STEM education.',
      it: 'Una piattaforma di apprendimento potenziata dall’AI per la didattica STEM.',
      de: 'Eine KI-gestützte Lernplattform für die MINT-Ausbildung.',
    },
    description: {
      en: ['IronMath is an EdTech product applying AI to STEM learning.'],
      it: ['IronMath è un prodotto EdTech che applica l’AI all’apprendimento STEM.'],
      de: ['IronMath ist ein EdTech-Produkt, das KI auf das MINT-Lernen anwendet.'],
      // NOTE: the case study is intentionally short. It will be expanded with
      // problem / architecture / role / decisions / outcomes WITHOUT exposing
      // proprietary source. See docs/CONTENT_MODEL.md § Private projects.
    },
    category: 'product',
    emphasis: 'standard',
    status: 'active',
    // TODO(owner): confirm start year.
    period: null,
    // Owner-confirmed as publicly disclosable. Product metrics and feature
    // claims stay out until the case study defines the disclosure boundary.
    technologies: ['React', 'Fastify', 'PostgreSQL', 'Python'],
    tags: ['edtech', 'ai', 'product', 'stem'],
    repository: {
      // Private: `url` stays null so no component can link to the source.
      visibility: 'private',
      url: null,
    },
    website: 'https://ironmath.it',
    links: [
      {
        label: 'Visit ironmath.it',
        href: 'https://ironmath.it',
        emphasis: 'primary',
        icon: 'external',
      },
    ],
    featured: true,
    order: 2,
    media: null,
    githubMetrics: null,
  },

  {
    id: 'cybercuisine',
    slug: 'cybercuisine',
    title: 'CyberCuisine',
    shortTitle: 'CyberCuisine',
    summary: {
      en: 'A university web development project, built and published in the open.',
      it: 'Un progetto universitario di sviluppo web, costruito e pubblicato in chiaro.',
      de: 'Ein Universitätsprojekt zur Webentwicklung, offen entwickelt und veröffentlicht.',
    },
    description: { en: [], it: [], de: [] },
    category: 'university',
    emphasis: 'standard',
    status: 'archived',
    // TODO(owner): confirm the academic year.
    period: null,
    // TODO(owner): fill in once verified from the repository — not guessed.
    technologies: [],
    tags: ['web', 'university'],
    repository: {
      visibility: 'public',
      url: 'https://github.com/samuelecorra/CyberCuisineV0',
    },
    website: null,
    links: [
      {
        label: 'View source on GitHub',
        href: 'https://github.com/samuelecorra/CyberCuisineV0',
        emphasis: 'primary',
        icon: 'github',
      },
    ],
    featured: true,
    order: 3,
    media: null,
    githubMetrics: null,
  },

  {
    id: 'portfolio',
    slug: 'portfolio',
    title: 'This Portfolio',
    shortTitle: 'Portfolio',
    summary: {
      en: "The website you're browsing. Designed and developed in public.",
      it: 'Il sito che stai visitando. Progettato e sviluppato in pubblico.',
      de: 'Die Website, die du gerade ansiehst. Öffentlich entworfen und entwickelt.',
    },
    description: {
      en: [
        'This site is part of the portfolio it presents. The repository is public, so the architecture, design system and content model can be read directly.',
      ],
      it: [
        'Questo sito fa parte del portfolio che presenta. La repository è pubblica, così architettura, design system e content model si possono leggere direttamente.',
      ],
      de: [
        'Diese Website ist Teil des Portfolios, das sie präsentiert. Das Repository ist öffentlich, sodass Architektur, Designsystem und Content-Modell direkt nachlesbar sind.',
      ],
    },
    category: 'website',
    emphasis: 'minor',
    status: 'in-progress',
    period: '2026 — present',
    // Verified: this is the stack the site is actually built on.
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    tags: ['open source', 'design system', 'accessibility'],
    repository: {
      visibility: 'public',
      url: PORTFOLIO_REPOSITORY_URL,
    },
    website: null,
    links: [
      {
        label: 'View source',
        href: PORTFOLIO_REPOSITORY_URL,
        emphasis: 'secondary',
        icon: 'github',
      },
    ],
    featured: true,
    order: 4,
    media: null,
    githubMetrics: null,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured).sort((a, b) => a.order - b.order);
}

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByIds(ids: readonly string[]): Project[] {
  return ids
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => project !== undefined);
}
