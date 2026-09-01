import type { JSX } from 'react';

import { Container } from '@/components/layout/Container';
import { ActionLink } from '@/components/ui/ActionLink';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/data/site';
import { socials } from '@/data/socials';

export function Hero(): JSX.Element {
  const github = socials.find((social) => social.id === 'github');

  return (
    <section aria-labelledby="hero-heading" className="py-20 sm:py-28 lg:py-36">
      <Container>
        <p className="mb-4 font-mono text-xs tracking-[0.2em] text-accent uppercase">{site.role}</p>

        {/* The page's only h1. */}
        <h1 id="hero-heading" className="text-4xl font-semibold tracking-tight sm:text-6xl">
          {site.name}
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-ink-muted sm:text-xl">{site.tagline}</p>
        <p className="mt-4 max-w-2xl text-ink-faint">{site.description}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <ActionLink href="/projects" emphasis="primary">
            View work
          </ActionLink>
          {github?.url ? (
            <ActionLink href={github.url} emphasis="secondary">
              <Icon name="github" className="h-4 w-4" />
              GitHub
            </ActionLink>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
