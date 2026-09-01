import type { IconName, Unconfirmed } from './common';

/**
 * A pointer to real, inspectable material. The core premise of this site is
 * that every competence claim resolves to one of these.
 */
export interface EvidenceLink {
  label: string;
  href: string;
  kind: 'repository' | 'notes' | 'project' | 'external';
  /**
   * Path inside the repository the evidence lives at, when applicable.
   * Kept separate from `href` so a future sync script can validate that the
   * path still exists rather than silently shipping a dead deep link.
   */
  repositoryPath: Unconfirmed<string>;
}

export interface KnowledgeArea {
  id: string;
  slug: string;
  title: string;
  /** What this area actually covers, in one or two sentences. */
  description: string;
  /** Concrete subjects — the honest replacement for percentage bars. */
  topics: string[];
  /** `Project.id` values this area produced or draws on. */
  relatedProjectIds: string[];
  evidence: EvidenceLink[];
  tags: string[];
  icon: IconName;
  order: number;
}
