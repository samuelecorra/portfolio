import type { JSX } from 'react';

import { Container } from '@/components/layout/Container';
import { ActionLink } from '@/components/ui/ActionLink';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function NotFoundPage(): JSX.Element {
  useDocumentTitle('Page not found');

  return (
    <div className="py-24 sm:py-32">
      <Container>
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Page not found</h1>
        <p className="mt-4 max-w-lg text-ink-muted">
          That route does not exist. It may have been renamed or never published.
        </p>
        <div className="mt-8">
          <ActionLink href="/" emphasis="primary">
            Back to home
          </ActionLink>
        </div>
      </Container>
    </div>
  );
}
