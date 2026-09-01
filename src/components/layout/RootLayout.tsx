import type { JSX } from 'react';
import { Outlet } from 'react-router';

import { Header } from '@/components/navigation/Header';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useI18n } from '@/i18n';

import { Footer } from './Footer';

/**
 * The application shell: skip link, header, routed content, footer.
 *
 * `<main id="main-content">` is the skip-link target and the single main
 * landmark on every page.
 */
export function RootLayout(): JSX.Element {
  const { t } = useI18n();
  useScrollToTop();

  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main-content" className="skip-link">
        {t.nav.skipToContent}
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
