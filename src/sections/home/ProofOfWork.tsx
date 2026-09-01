import type { JSX } from 'react';

import { Section } from '@/components/layout/Section';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ActionLink } from '@/components/ui/ActionLink';
import { getFeaturedProjects } from '@/data/projects';

export function ProofOfWork(): JSX.Element {
  const featured = getFeaturedProjects();

  return (
    <Section
      id="work"
      eyebrow="Proof of work"
      title="Selected work"
      description="Things I build or maintain. Each one links to the work itself, not a description of it."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {featured.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index + 1} />
        ))}
      </div>

      <div className="mt-10">
        <ActionLink href="/projects" emphasis="secondary">
          All projects
        </ActionLink>
      </div>
    </Section>
  );
}
