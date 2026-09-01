import { useEffect } from 'react';

import { site } from '@/data/site';

/**
 * Sets the document title for a route.
 *
 * Intentionally a 10-line hook rather than a head-management library: this is
 * an SPA whose crawler-facing metadata lives in static index.html. Revisit if
 * per-route OG tags become a requirement (that needs pre-rendering, not a lib).
 */
export function useDocumentTitle(title?: string): void {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : `${site.name} — Technical Hub`;
  }, [title]);
}
