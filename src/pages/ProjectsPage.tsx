import type { JSX } from 'react';

import { Section } from '@/components/layout/Section';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { getAllProjects } from '@/data/projects';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useI18n } from '@/i18n';

export function ProjectsPage(): JSX.Element {
  const { t } = useI18n();
  useDocumentTitle(t.work.indexTitle);
  const projects = getAllProjects();

  return (
    <Section
      id="projects"
      eyebrow={t.work.eyebrow}
      title={t.work.indexTitle}
      description={t.work.indexDescription}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index + 1} />
        ))}
      </div>
    </Section>
  );
}
