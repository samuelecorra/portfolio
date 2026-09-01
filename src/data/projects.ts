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
    summary:
      'A public, inspectable archive of the theory, notes, exercises and exam preparation built across a cybersecurity degree.',
    description: [
      'This is the material behind the claims made elsewhere on this site: lecture notes, worked exercises, theory write-ups and exam preparation, kept in the open and versioned.',
      'It spans cybersecurity, networking, databases, operating systems, cryptography, mathematics, statistics and core computer science — organised so that a reader can go straight to a subject and judge the depth for themselves.',
      'It is published deliberately. Anyone assessing technical background should be able to read the actual work rather than take a bullet point on trust.',
    ],
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
    summary: 'An AI-powered learning platform for STEM education.',
    description: [
      'IronMath is an EdTech product applying AI to STEM learning.',
      // NOTE: the case study is intentionally short. It will be expanded with
      // problem / architecture / role / decisions / outcomes WITHOUT exposing
      // proprietary source. See docs/CONTENT_MODEL.md § Private projects.
    ],
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
    summary: 'A university web development project, built and published in the open.',
    description: [],
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
    summary: "The website you're browsing. Designed and developed in public.",
    description: [
      'This site is part of the portfolio it presents. The repository is intended to be public, so the architecture, design system and content model can be read directly.',
    ],
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
