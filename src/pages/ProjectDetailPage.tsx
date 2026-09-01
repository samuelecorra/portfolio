import type { JSX } from 'react';
import { Link, useParams } from 'react-router';

import { Container } from '@/components/layout/Container';
import { ActionLink } from '@/components/ui/ActionLink';
import { Icon } from '@/components/ui/Icon';
import { getProjectBySlug } from '@/data/projects';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

import { NotFoundPage } from './NotFoundPage';

export function ProjectDetailPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  useDocumentTitle(project?.title ?? 'Project not found');

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <article className="py-16 sm:py-20">
      <Container>
        <Link to="/projects" className="text-sm text-ink-muted hover:text-accent">
          ← All projects
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">{project.summary}</p>

        {project.links.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <ActionLink key={link.href} href={link.href} emphasis={link.emphasis}>
                <Icon name={link.icon} className="h-4 w-4" />
                {link.label}
              </ActionLink>
            ))}
          </div>
        ) : null}

        {/*
         * A project with no written case study shows its metadata and stops.
         * We do not generate filler prose to make the page look complete.
         */}
        {project.description.length > 0 ? (
          <div className="mt-12 flex max-w-2xl flex-col gap-4">
            {project.description.map((paragraph) => (
              <p key={paragraph} className="text-ink-muted">
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <p className="mt-12 max-w-2xl text-ink-faint">
            A detailed case study for this project has not been written yet.
          </p>
        )}

        <dl className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
          <div>
            <dt className="font-mono text-xs tracking-wider text-ink-faint uppercase">Status</dt>
            <dd className="mt-1 text-sm">{project.status}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs tracking-wider text-ink-faint uppercase">Period</dt>
            <dd className="mt-1 text-sm">{project.period ?? 'Not specified'}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs tracking-wider text-ink-faint uppercase">Source</dt>
            <dd className="mt-1 text-sm">
              {project.repository.visibility === 'public' && project.repository.url ? (
                <a
                  href={project.repository.url}
                  className="text-accent hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Public repository
                </a>
              ) : project.repository.visibility === 'private' ? (
                'Private repository'
              ) : (
                'Not published yet'
              )}
            </dd>
          </div>
        </dl>

        {project.technologies.length > 0 ? (
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies">
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
      </Container>
    </article>
  );
}
