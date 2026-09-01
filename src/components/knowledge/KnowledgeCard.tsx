import type { JSX } from 'react';

import { Icon } from '@/components/ui/Icon';
import { externalLinkAttrs, isInternalHref } from '@/lib/links';
import type { KnowledgeArea } from '@/types';

interface KnowledgeCardProps {
  area: KnowledgeArea;
}

/**
 * A competence area expressed as concrete topics plus links to real material.
 *
 * There are deliberately no proficiency bars or percentages here: the topic
 * list and the evidence link are the claim. See docs/CONTENT_MODEL.md.
 */
export function KnowledgeCard({ area }: KnowledgeCardProps): JSX.Element {
  const headingId = `knowledge-${area.id}-title`;

  return (
    <article
      aria-labelledby={headingId}
      className="flex flex-col gap-4 rounded-(--radius-card) border border-line bg-surface p-6 transition-colors duration-(--duration-base) focus-within:border-line-strong hover:border-line-strong"
    >
      <div className="flex items-center gap-3">
        <span className="rounded-lg bg-surface-raised p-2 text-accent">
          <Icon name={area.icon} className="h-5 w-5" />
        </span>
        <h3 id={headingId} className="text-lg font-semibold">
          {area.title}
        </h3>
      </div>

      <p className="text-sm text-ink-muted">{area.description}</p>

      <ul className="flex flex-wrap gap-2" aria-label={`Topics in ${area.title}`}>
        {area.topics.map((topic) => (
          <li
            key={topic}
            className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-ink-faint"
          >
            {topic}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-2 pt-2">
        {area.evidence.map((evidence) =>
          isInternalHref(evidence.href) ? (
            <a
              key={evidence.href}
              href={evidence.href}
              className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
            >
              {evidence.label}
              <Icon name="external" className="h-3.5 w-3.5" />
            </a>
          ) : (
            <a
              key={evidence.href}
              href={evidence.href}
              className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
              {...externalLinkAttrs}
            >
              {evidence.label}
              <Icon name="external" className="h-3.5 w-3.5" />
            </a>
          ),
        )}
      </div>
    </article>
  );
}
