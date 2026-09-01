import type { JSX } from 'react';

import { Section } from '@/components/layout/Section';
import { ActionLink } from '@/components/ui/ActionLink';
import { nowEntries, nowLastUpdated, type NowEntry } from '@/data/now';
import { localize, useI18n } from '@/i18n';

export function NowSection(): JSX.Element {
  const { t, locale } = useI18n();

  const kindLabel: Record<NowEntry['kind'], string> = {
    building: t.now.building,
    studying: t.now.studying,
    exploring: t.now.exploring,
  };

  return (
    <Section id="now" eyebrow={t.now.eyebrow} title={t.now.title} description={t.now.description}>
      <ul className="flex flex-col gap-4">
        {nowEntries.map((entry) => {
          const title = localize(entry.title, locale);

          return (
            <li
              key={entry.id}
              className="flex flex-col gap-2 rounded-(--radius-card) border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <div>
                <p className="font-mono text-xs tracking-wider text-accent uppercase">
                  {kindLabel[entry.kind]}
                </p>
                <p className="mt-1 font-medium">{title}</p>
                <p className="mt-1 text-sm text-ink-muted">{localize(entry.detail, locale)}</p>
              </div>
              {entry.href ? (
                <ActionLink
                  href={entry.href}
                  emphasis="ghost"
                  className="shrink-0 px-0 sm:px-4"
                  ariaLabel={`${t.now.moreAbout} ${title}`}
                >
                  {t.now.details}
                </ActionLink>
              ) : null}
            </li>
          );
        })}
      </ul>

      <p className="mt-6 text-sm text-ink-faint">
        {t.now.lastUpdated} <time dateTime={nowLastUpdated}>{nowLastUpdated}</time>
      </p>
    </Section>
  );
}
