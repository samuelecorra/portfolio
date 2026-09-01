import type { JSX } from 'react';

import { Container } from '@/components/layout/Container';
import { ActionLink } from '@/components/ui/ActionLink';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useI18n } from '@/i18n';

export function NotFoundPage(): JSX.Element {
  const { t } = useI18n();
  useDocumentTitle(t.notFound.title);

  return (
    <div className="py-24 sm:py-32">
      <Container>
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {t.notFound.title}
        </h1>
        <p className="mt-4 max-w-lg text-ink-muted">{t.notFound.description}</p>
        <div className="mt-8">
          <ActionLink href="/" emphasis="primary">
            {t.notFound.cta}
          </ActionLink>
        </div>
      </Container>
    </div>
  );
}
