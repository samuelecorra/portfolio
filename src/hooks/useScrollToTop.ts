import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * Scrolls to the top on route change, unless the URL carries a hash.
 *
 * React Router's <ScrollRestoration> requires a data router; we use the
 * declarative <BrowserRouter> (see docs/ARCHITECTURE.md § Routing), so this
 * eight-line hook covers the one behaviour we actually need.
 */
export function useScrollToTop(): void {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);
}
