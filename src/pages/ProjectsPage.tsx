import type { JSX } from 'react';

import { Section } from '@/components/layout/Section';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { getAllProjects } from '@/data/projects';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function ProjectsPage(): JSX.Element {
  useDocumentTitle('Projects');
  const projects = getAllProjects();

  return (
    <Section
      id="projects"
      eyebrow="Proof of work"
      title="Projects"
      description="Everything currently published, newest focus first."
      headingLevel={2}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index + 1} />
        ))}
      </div>
    </Section>
  );
}
