import type { JSX } from 'react';

import { Container } from '@/components/layout/Container';
import { ActionLink } from '@/components/ui/ActionLink';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/data/site';
import { socials } from '@/data/socials';
import { localize, useI18n } from '@/i18n';

export function Hero(): JSX.Element {
  const { t, locale } = useI18n();
  const github = socials.find((social) => social.id === 'github');

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      {/*
       * A single soft accent wash anchored top-left. Purely decorative, so it
       * is hidden from assistive tech and cannot intercept pointer events.
       * This is the only ambient effect on the page — deliberately.
       */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_55%_at_15%_0%,rgba(58,190,255,0.10),transparent_65%)]"
      />

      <Container>
        <p className="font-mono text-xs tracking-[0.22em] text-accent uppercase sm:text-sm">
          {localize(site.role, locale)}
        </p>

        {/* The page's only h1. */}
        <h1
          id="hero-heading"
          className="mt-6 text-5xl font-semibold tracking-tight sm:text-7xl lg:text-8xl"
        >
          {site.name}
        </h1>

        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink sm:text-2xl">
          {localize(site.tagline, locale)}
        </p>

        <p className="mt-5 max-w-xl text-ink-muted">{t.hero.intro}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <ActionLink href="/projects" emphasis="primary">
            {t.hero.ctaWork}
          </ActionLink>
          {github?.url ? (
            <ActionLink href={github.url} emphasis="secondary">
              <Icon name="github" className="h-4 w-4" />
              {t.hero.ctaGithub}
            </ActionLink>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
