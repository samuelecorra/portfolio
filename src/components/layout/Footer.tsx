import type { JSX } from 'react';

import { SocialLinks } from '@/components/social/SocialLinks';
import { site } from '@/data/site';
import { useI18n } from '@/i18n';
import { externalLinkAttrs } from '@/lib/links';

import { Container } from './Container';

export function Footer(): JSX.Element {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-10">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-ink-muted">
              © {year} {site.name}
            </p>
            {/*
             * Source transparency: the site links to its own code once the
             * repository is public. Until then we say so rather than linking
             * somewhere that does not exist.
             */}
            <p className="mt-1 text-sm text-ink-faint">
              {site.repositoryUrl ? (
                <a href={site.repositoryUrl} className="hover:text-accent" {...externalLinkAttrs}>
                  {t.footer.sourceOnGithub}
                </a>
              ) : (
                t.footer.builtInPublic
              )}
            </p>
          </div>

          <SocialLinks variant="compact" />
        </div>
      </Container>
    </footer>
  );
}
