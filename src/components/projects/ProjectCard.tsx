import type { JSX } from 'react';
import { Link } from 'react-router';

import { ActionLink } from '@/components/ui/ActionLink';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';
import type { Project, ProjectEmphasis } from '@/types';

interface ProjectCardProps {
  project: Project;
  /** Rendered as the 01 / 02 / 03 index numeral. */
  index: number;
}

const STATUS_LABEL: Record<Project['status'], string> = {
  active: 'Active',
  'in-progress': 'In progress',
  maintained: 'Maintained',
  archived: 'Archived',
};

/**
 * Grid footprint per editorial weight.
 *
 * The card declares its own span so the grid stays a dumb 2-column container
 * and callers never need to know which project is important.
 */
const SPAN: Record<ProjectEmphasis, string> = {
  primary: 'md:col-span-2',
  standard: '',
  minor: 'md:col-span-2',
};

const CARD_BASE =
  'group relative flex flex-col rounded-(--radius-card) border border-line bg-surface transition-colors duration-(--duration-base) hover:border-line-strong focus-within:border-line-strong';

export function ProjectCard({ project, index }: ProjectCardProps): JSX.Element {
  if (project.emphasis === 'minor') {
    return <CompactCard project={project} index={index} />;
  }

  const isPrimary = project.emphasis === 'primary';
  const headingId = `project-${project.id}-title`;

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        CARD_BASE,
        SPAN[project.emphasis],
        isPrimary ? 'gap-6 p-7 sm:p-10' : 'gap-5 p-6 sm:p-8',
        // The archive is the site's central proof: it gets a soft accent wash
        // that the other cards do not, so weight reads before any text does.
        isPrimary &&
          'bg-[radial-gradient(120%_100%_at_0%_0%,rgba(58,190,255,0.07),transparent_60%)]',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span
              className={cn('font-mono text-ink-faint', isPrimary ? 'text-sm' : 'text-xs')}
              aria-hidden
            >
              {String(index).padStart(2, '0')}
            </span>
            {isPrimary ? (
              <span className="rounded-full border border-accent-dim px-2.5 py-0.5 font-mono text-[0.65rem] tracking-[0.18em] text-accent uppercase">
                Featured
              </span>
            ) : null}
          </div>

          <h3
            id={headingId}
            className={cn(
              'mt-3 font-semibold tracking-tight',
              isPrimary ? 'text-2xl sm:text-4xl' : 'text-xl sm:text-2xl',
            )}
          >
            {/* The title is the link, so the card itself need not be one. */}
            <Link to={`/projects/${project.slug}`} className="hover:text-accent">
              {project.title}
            </Link>
          </h3>
        </div>

        <span className="shrink-0 rounded-full border border-line px-2.5 py-1 text-xs text-ink-faint">
          {STATUS_LABEL[project.status]}
        </span>
      </div>

      <p className={cn('text-ink-muted', isPrimary && 'max-w-2xl text-lg')}>{project.summary}</p>

      {/*
       * On the featured card the subject tags are the density signal — they are
       * what tells a reader the archive is broad. Elsewhere the tech list does
       * that job, so tags stay hidden to keep standard cards quiet.
       */}
      {isPrimary && project.tags.length > 0 ? (
        <ul className="flex flex-wrap gap-2" aria-label="Subjects covered">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-line bg-surface-raised px-2.5 py-1 font-mono text-xs text-ink-faint"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

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

/**
 * The understated variant, currently used only by this site's own card: a
 * full-width strip that reads as a footnote rather than competing with real
 * project work.
 */
function CompactCard({ project, index }: ProjectCardProps): JSX.Element {
  const headingId = `project-${project.id}-title`;

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        CARD_BASE,
        SPAN[project.emphasis],
        'gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6',
      )}
    >
      <div className="flex min-w-0 items-baseline gap-3">
        <span className="font-mono text-xs text-ink-faint" aria-hidden>
          {String(index).padStart(2, '0')}
        </span>
        <div className="min-w-0">
          <h3 id={headingId} className="text-base font-semibold">
            <Link to={`/projects/${project.slug}`} className="hover:text-accent">
              {project.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-ink-muted">{project.summary}</p>
        </div>
      </div>

      {project.links.length > 0 ? (
        <div className="flex shrink-0 flex-wrap gap-3">
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
