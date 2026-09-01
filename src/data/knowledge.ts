import type { KnowledgeArea } from '@/types';

import { ARCHIVE_REPOSITORY_URL } from './projects';

/**
 * The knowledge index: competence expressed as concrete topics plus a link to
 * material someone can actually read.
 *
 * Explicitly NOT a skills list with percentages. If an area cannot point at
 * evidence, it does not belong here.
 *
 * `repositoryPath` is null everywhere for now: the archive's folder layout has
 * not been mapped yet, so deep links would be guesses. Filling these in later
 * upgrades each card from "here is the repo" to "here is the exact folder".
 */
export const knowledgeAreas: KnowledgeArea[] = [
  {
    id: 'network-security',
    slug: 'network-security',
    title: 'Networks & Network Security',
    description:
      'How networks actually move packets, and how they are attacked and defended at each layer.',
    topics: ['TCP/IP', 'routing', 'DNS', 'firewalls', 'network protocols', 'network security'],
    relatedProjectIds: ['cybersec-archive'],
    evidence: [
      {
        label: 'Explore knowledge archive',
        href: ARCHIVE_REPOSITORY_URL,
        kind: 'repository',
        repositoryPath: null,
      },
    ],
    tags: ['networking', 'security'],
    icon: 'network',
    order: 1,
  },
  {
    id: 'database-systems',
    slug: 'database-systems',
    title: 'Database Systems',
    description:
      'Relational theory through to the mechanics that keep concurrent systems correct under failure.',
    topics: [
      'relational algebra',
      'SQL',
      'transactions',
      'concurrency',
      'recovery',
      'distributed databases',
    ],
    relatedProjectIds: ['cybersec-archive'],
    evidence: [
      {
        label: 'Explore notes and exercises',
        href: ARCHIVE_REPOSITORY_URL,
        kind: 'repository',
        repositoryPath: null,
      },
    ],
    tags: ['databases'],
    icon: 'database',
    order: 2,
  },
  {
    id: 'cryptography',
    slug: 'cryptography',
    title: 'Cryptography',
    description:
      'The primitives modern security rests on, and the assumptions that make them hold.',
    topics: [
      'symmetric encryption',
      'public-key cryptography',
      'hash functions',
      'digital signatures',
      'key exchange',
      'protocols',
    ],
    relatedProjectIds: ['cybersec-archive'],
    evidence: [
      {
        label: 'Explore knowledge archive',
        href: ARCHIVE_REPOSITORY_URL,
        kind: 'repository',
        repositoryPath: null,
      },
    ],
    tags: ['cryptography', 'security'],
    icon: 'shield',
    order: 3,
  },
  {
    id: 'operating-systems',
    slug: 'operating-systems',
    title: 'Operating Systems',
    description: 'What the machine is doing underneath the runtime.',
    topics: [
      'processes and threads',
      'scheduling',
      'memory management',
      'synchronisation',
      'file systems',
      'system calls',
    ],
    relatedProjectIds: ['cybersec-archive'],
    evidence: [
      {
        label: 'Explore notes and exercises',
        href: ARCHIVE_REPOSITORY_URL,
        kind: 'repository',
        repositoryPath: null,
      },
    ],
    tags: ['systems'],
    icon: 'code',
    order: 4,
  },
  {
    id: 'mathematics-statistics',
    slug: 'mathematics-statistics',
    title: 'Mathematics & Statistics',
    description: 'The formal groundwork underneath cryptography, algorithms and data work.',
    topics: [
      'linear algebra',
      'calculus',
      'discrete mathematics',
      'probability',
      'statistics',
      'numerical methods',
    ],
    relatedProjectIds: ['cybersec-archive'],
    evidence: [
      {
        label: 'Explore notes and exercises',
        href: ARCHIVE_REPOSITORY_URL,
        kind: 'repository',
        repositoryPath: null,
      },
    ],
    tags: ['mathematics', 'statistics'],
    icon: 'sigma',
    order: 5,
  },
  {
    id: 'computer-science',
    slug: 'computer-science',
    title: 'Computer Science Foundations',
    description: 'Algorithms, data structures and the reasoning tools that outlast any stack.',
    topics: [
      'algorithms',
      'data structures',
      'complexity',
      'programming languages',
      'software engineering',
    ],
    relatedProjectIds: ['cybersec-archive', 'cybercuisine'],
    evidence: [
      {
        label: 'Explore knowledge archive',
        href: ARCHIVE_REPOSITORY_URL,
        kind: 'repository',
        repositoryPath: null,
      },
    ],
    tags: ['computer science'],
    icon: 'book',
    order: 6,
  },
];

export function getKnowledgeAreas(): KnowledgeArea[] {
  return [...knowledgeAreas].sort((a, b) => a.order - b.order);
}

export function getKnowledgeAreaBySlug(slug: string): KnowledgeArea | undefined {
  return knowledgeAreas.find((area) => area.slug === slug);
}
