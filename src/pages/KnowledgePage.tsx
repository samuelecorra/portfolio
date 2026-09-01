import type { JSX } from 'react';

import { KnowledgeCard } from '@/components/knowledge/KnowledgeCard';
import { Section } from '@/components/layout/Section';
import { getKnowledgeAreas } from '@/data/knowledge';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function KnowledgePage(): JSX.Element {
  useDocumentTitle('Knowledge');
  const areas = getKnowledgeAreas();

  return (
    <Section
      id="knowledge-index"
      eyebrow="Knowledge index"
      title="Competence, with the receipts"
      description="Each area lists the topics it actually covers and links to the material behind it. No percentages."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {areas.map((area) => (
          <KnowledgeCard key={area.id} area={area} />
        ))}
      </div>
    </Section>
  );
}
