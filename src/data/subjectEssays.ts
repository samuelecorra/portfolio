import type { LocalizedList } from '@/i18n';

import { anno1Essays } from './essays/anno1';
import { anno2Essays } from './essays/anno2';
import { anno3Essays } from './essays/anno3';

/**
 * Testi estesi per la pagina di dettaglio di ogni materia.
 *
 * Questo modulo è importato in modo dinamico da SubjectPage: i testi servono
 * solo su /knowledge/:slug, e sono abbastanza voluminosi da non meritare un
 * posto nel bundle principale. Le descrizioni brevi delle card stanno invece in
 * `subjectSummaries.ts`, che è bundled perché serve su /knowledge.
 */
export const subjectEssays: Record<string, LocalizedList> = {
  ...anno1Essays,
  ...anno2Essays,
  ...anno3Essays,
};

export function getSubjectEssay(slug: string): LocalizedList | undefined {
  return subjectEssays[slug];
}
