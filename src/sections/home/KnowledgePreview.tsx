import type { JSX } from 'react';

import { KnowledgeCard } from '@/components/knowledge/KnowledgeCard';
import { Section } from '@/components/layout/Section';
import { ActionLink } from '@/components/ui/ActionLink';
import { getKnowledgeAreas } from '@/data/knowledge';

const PREVIEW_COUNT = 3;

export function KnowledgePreview(): JSX.Element {
  const areas = getKnowledgeAreas().slice(0, PREVIEW_COUNT);

  return (
    <Section
      id="knowledge"
      eyebrow="Knowledge"
      title="What I actually know"
      description="Competence as concrete topics rather than percentages. Every claim links to evidence."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {areas.map((area) => (
          <KnowledgeCard key={area.id} area={area} />
        ))}
      </div>

      <div className="mt-10">
        <ActionLink href="/knowledge" emphasis="secondary">
          Full knowledge index
        </ActionLink>
      </div>
    </Section>
  );
}
