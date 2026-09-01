import type { JSX } from 'react';
import { Link, useParams } from 'react-router';

import { Container } from '@/components/layout/Container';
import { ActionLink } from '@/components/ui/ActionLink';
import { Icon } from '@/components/ui/Icon';
import { getProjectBySlug } from '@/data/projects';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { localize, localizeList, useI18n } from '@/i18n';
import { externalLinkAttrs } from '@/lib/links';

import { NotFoundPage } from './NotFoundPage';

export function ProjectDetailPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const { t, locale } = useI18n();
  const project = slug ? getProjectBySlug(slug) : undefined;

  useDocumentTitle(project?.title ?? t.notFound.title);

  if (!project) {
    return <NotFoundPage />;
  }

  const paragraphs = localizeList(project.description, locale);

  return (
    <article className="py-16 sm:py-20">
      <Container>
        <Link to="/projects" className="text-sm text-ink-muted hover:text-accent">
          ← {t.work.back}
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">{localize(project.summary, locale)}</p>

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
        {paragraphs.length > 0 ? (
          <div className="mt-12 flex max-w-2xl flex-col gap-4">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-ink-muted">
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <p className="mt-12 max-w-2xl text-ink-faint">{t.work.noCaseStudy}</p>
        )}

        <dl className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
          <div>
            <dt className="font-mono text-xs tracking-wider text-ink-faint uppercase">
              {t.work.status}
            </dt>
            <dd className="mt-1 text-sm">{t.status[project.status]}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs tracking-wider text-ink-faint uppercase">
              {t.work.period}
            </dt>
            <dd className="mt-1 text-sm">{project.period ?? t.work.notSpecified}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs tracking-wider text-ink-faint uppercase">
              {t.work.source}
            </dt>
            <dd className="mt-1 text-sm">
              {project.repository.visibility === 'public' && project.repository.url ? (
                <a
                  href={project.repository.url}
                  className="text-accent hover:underline"
                  {...externalLinkAttrs}
                >
                  {t.repository.public}
                </a>
              ) : (
                t.repository[project.repository.visibility]
              )}
            </dd>
          </div>
        </dl>

        {project.technologies.length > 0 ? (
          <ul className="mt-8 flex flex-wrap gap-2" aria-label={t.work.technologies}>
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
