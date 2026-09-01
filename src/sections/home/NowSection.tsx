import type { JSX } from 'react';

import { Section } from '@/components/layout/Section';
import { ActionLink } from '@/components/ui/ActionLink';
import { nowEntries, nowLastUpdated, type NowEntry } from '@/data/now';

const KIND_LABEL: Record<NowEntry['kind'], string> = {
  building: 'Building',
  studying: 'Studying',
  exploring: 'Exploring',
};

export function NowSection(): JSX.Element {
  return (
    <Section
      id="now"
      eyebrow="Now"
      title="What I'm working on"
      description="Current focus, kept deliberately short and dated."
    >
      <ul className="flex flex-col gap-4">
        {nowEntries.map((entry) => (
          <li
            key={entry.id}
            className="flex flex-col gap-2 rounded-(--radius-card) border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          >
            <div>
              <p className="font-mono text-xs tracking-wider text-accent uppercase">
                {KIND_LABEL[entry.kind]}
              </p>
              <p className="mt-1 font-medium">{entry.title}</p>
              <p className="mt-1 text-sm text-ink-muted">{entry.detail}</p>
            </div>
            {entry.href ? (
              <ActionLink
                href={entry.href}
                emphasis="ghost"
                className="shrink-0 px-0 sm:px-4"
                ariaLabel={`More about ${entry.title}`}
              >
                Details
              </ActionLink>
            ) : null}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-ink-faint">
        Last updated <time dateTime={nowLastUpdated}>{nowLastUpdated}</time>
      </p>
    </Section>
  );
}
