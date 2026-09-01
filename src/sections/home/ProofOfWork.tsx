import type { JSX } from 'react';

import { Section } from '@/components/layout/Section';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ActionLink } from '@/components/ui/ActionLink';
import { getFeaturedProjects } from '@/data/projects';
import { useI18n } from '@/i18n';

export function ProofOfWork(): JSX.Element {
  const { t } = useI18n();
  const featured = getFeaturedProjects();

  return (
    <Section
      id="work"
      eyebrow={t.work.eyebrow}
      title={t.work.title}
      description={t.work.description}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {featured.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index + 1} />
        ))}
      </div>

      <div className="mt-10">
        <ActionLink href="/projects" emphasis="secondary">
          {t.work.all}
        </ActionLink>
      </div>
    </Section>
  );
}
