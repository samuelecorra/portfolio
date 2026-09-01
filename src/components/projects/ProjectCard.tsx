import type { JSX } from 'react';
import { Link } from 'react-router';

import { ActionLink } from '@/components/ui/ActionLink';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  /** Displayed as the large 01 / 02 / 03 index numeral. */
  index: number;
}

const STATUS_LABEL: Record<Project['status'], string> = {
  active: 'Active',
  'in-progress': 'In progress',
  maintained: 'Maintained',
  archived: 'Archived',
};

/**
 * Structural project card.
 *
 * NOTE: this is the Phase-4 skeleton — correct semantics, data-driven content,
 * deliberately restrained visuals. The cursor-reactive / border-illumination
 * treatment described in docs/DESIGN_SYSTEM.md lands in the design phase.
 */
export function ProjectCard({ project, index }: ProjectCardProps): JSX.Element {
  const headingId = `project-${project.id}-title`;

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        'relative flex flex-col gap-5 rounded-(--radius-card) border border-line bg-surface p-6 sm:p-8',
        'transition-colors duration-(--duration-base) focus-within:border-line-strong hover:border-line-strong',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-ink-faint" aria-hidden>
            {String(index).padStart(2, '0')}
          </span>
          <h3 id={headingId} className="mt-2 text-xl font-semibold sm:text-2xl">
            {/* The title is the primary link, so the whole card need not be one. */}
            <Link to={`/projects/${project.slug}`} className="hover:text-accent">
              {project.title}
            </Link>
          </h3>
        </div>
        <span className="shrink-0 rounded-full border border-line px-2.5 py-1 text-xs text-ink-faint">
          {STATUS_LABEL[project.status]}
        </span>
      </div>

      <p className="text-ink-muted">{project.summary}</p>

      {project.technologies.length > 0 ? (
        <ul className="flex flex-wrap gap-2" aria-label="Technologies">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-md bg-surface-raised px-2.5 py-1 font-mono text-xs text-ink-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      ) : null}

      {project.links.length > 0 ? (
        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          {project.links.map((link) => (
            <ActionLink key={link.href} href={link.href} emphasis={link.emphasis}>
              <Icon name={link.icon} className="h-4 w-4" />
              {link.label}
            </ActionLink>
          ))}
        </div>
      ) : null}
    </article>
  );
}
