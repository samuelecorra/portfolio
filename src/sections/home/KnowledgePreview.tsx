import type { JSX } from 'react';

import { Section } from '@/components/layout/Section';
import { StatBand } from '@/components/knowledge/StatBand';
import { SubjectCard } from '@/components/knowledge/SubjectCard';
import { ActionLink } from '@/components/ui/ActionLink';
import { getTopSubjects } from '@/data/curriculum';
import { useI18n } from '@/i18n';

const PREVIEW_COUNT = 6;

export function KnowledgePreview(): JSX.Element {
  const { t } = useI18n();
  const subjects = getTopSubjects(PREVIEW_COUNT);

  return (
    <Section
      id="knowledge"
      eyebrow={t.knowledge.eyebrow}
      title={t.knowledge.title}
      description={t.knowledge.description}
    >
      <StatBand />

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <SubjectCard key={subject.slug} subject={subject} />
        ))}
      </div>

      <div className="mt-10">
        <ActionLink href="/knowledge" emphasis="secondary">
          {t.knowledge.all}
        </ActionLink>
      </div>
    </Section>
  );
}
