import { useEffect, useState, type JSX } from 'react';
import { Link, useParams } from 'react-router';

import { Container } from '@/components/layout/Container';
import { SubjectTree } from '@/components/knowledge/SubjectTree';
import { ActionLink } from '@/components/ui/ActionLink';
import { Icon } from '@/components/ui/Icon';
import { getSubjectBySlug, subjectName } from '@/data/curriculum';
import { loadSubjectTree, type SubjectTree as SubjectTreeData } from '@/data/subjectTree';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useI18n } from '@/i18n';

import { NotFoundPage } from './NotFoundPage';

export function SubjectPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const { t, locale } = useI18n();
  const subject = slug ? getSubjectBySlug(slug) : undefined;
  const [loaded, setLoaded] = useState<SubjectTreeData | null>(null);

  const name = subject ? subjectName(subject, locale) : '';
  useDocumentTitle(subject ? name : t.notFound.title);

  const slug_ = subject?.slug;

  useEffect(() => {
    if (!slug_) return undefined;

    let cancelled = false;
    void loadSubjectTree(slug_).then((result) => {
      if (!cancelled) setLoaded(result);
    });

    return () => {
      cancelled = true;
    };
  }, [slug_]);

  if (!subject) return <NotFoundPage />;

  /*
   * Derived rather than reset in the effect: navigating between subjects would
   * otherwise need a synchronous setState(null), which cascades a render. If
   * the loaded chunk belongs to a different subject it simply does not count
   * as loaded yet.
   */
  const tree = loaded?.slug === subject.slug ? loaded : null;

  const { counts } = subject;
  const metrics = [
    { value: counts.modules, label: t.metrics.modules },
    { value: counts.units, label: t.metrics.units },
    { value: counts.lessons, label: t.metrics.lessons },
    { value: counts.notes, label: t.metrics.notes },
    { value: counts.pdfs, label: t.metrics.pdfs },
    { value: counts.code, label: t.metrics.code },
    { value: counts.files, label: t.metrics.files },
  ].filter((metric) => metric.value > 0);

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <Link to="/knowledge" className="text-sm text-ink-muted hover:text-accent">
          ← {t.knowledge.backToIndex}
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">{name}</h1>
        {name !== subject.title ? (
          <p className="mt-2 font-mono text-sm text-ink-faint">{subject.title}</p>
        ) : null}

        <dl className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex items-baseline gap-2">
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <span className="font-mono text-lg font-semibold text-accent">
                  {metric.value.toLocaleString()}
                </span>
                <span className="ml-1.5 text-xs text-ink-faint">{metric.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <ActionLink href={subject.viewerUrl} emphasis="primary">
            <Icon name="book" className="h-4 w-4" />
            {t.knowledge.viewInArchive}
          </ActionLink>
          <ActionLink href={subject.githubUrl} emphasis="secondary">
            <Icon name="github" className="h-4 w-4" />
            {t.knowledge.viewOnGithub}
          </ActionLink>
        </div>

        <p className="mt-4 text-xs text-ink-faint">{t.knowledge.sourceLanguage}</p>

        <section aria-labelledby="contents-heading" className="mt-12">
          <h2 id="contents-heading" className="mb-4 text-xl font-semibold">
            {t.knowledge.contents}
          </h2>

          {/*
           * The tree is a per-subject lazy chunk, so it arrives after paint.
           * aria-busy tells assistive tech the region is still filling in.
           */}
          <div aria-busy={tree === null} className="rounded-(--radius-card) border border-line p-3">
            {tree === null ? (
              <p className="px-2 py-4 text-sm text-ink-faint">…</p>
            ) : tree.children.length === 0 && tree.files.length === 0 ? (
              <p className="px-2 py-4 text-sm text-ink-faint">{t.knowledge.noStructure}</p>
            ) : (
              <SubjectTree
                nodes={tree.children}
                files={tree.files}
                viewerBase={subject.viewerUrl}
                segments={[]}
              />
            )}
          </div>
        </section>
      </Container>
    </div>
  );
}
