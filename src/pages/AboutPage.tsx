import type { JSX } from 'react';

import { Container } from '@/components/layout/Container';
import { SocialLinks } from '@/components/social/SocialLinks';
import { aboutIntro, principles } from '@/data/about';
import { site } from '@/data/site';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function AboutPage(): JSX.Element {
  useDocumentTitle('About');

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">About</h1>

        <div className="mt-8 flex max-w-2xl flex-col gap-4">
          {aboutIntro.map((paragraph) => (
            <p key={paragraph} className="text-ink-muted">
              {paragraph}
            </p>
          ))}
        </div>

        <section aria-labelledby="principles-heading" className="mt-16">
          <h2 id="principles-heading" className="text-xl font-semibold sm:text-2xl">
            Principles
          </h2>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle.title}>
                <dt className="font-medium text-ink">{principle.title}</dt>
                <dd className="mt-1 text-sm text-ink-muted">{principle.detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="about-contact-heading" className="mt-16">
          <h2 id="about-contact-heading" className="text-xl font-semibold sm:text-2xl">
            Elsewhere
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-ink-muted">
            Professional history lives on LinkedIn. {site.name} elsewhere:
          </p>
          <SocialLinks className="mt-6" />
        </section>
      </Container>
    </div>
  );
}
