import type { JSX } from 'react';

import { Container } from '@/components/layout/Container';
import { StatBand } from '@/components/knowledge/StatBand';
import { SubjectCard } from '@/components/knowledge/SubjectCard';
import { ActionLink } from '@/components/ui/ActionLink';
import { Icon } from '@/components/ui/Icon';
import { archiveSource, getCurriculumYears, yearLabel } from '@/data/curriculum';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useI18n } from '@/i18n';

export function KnowledgePage(): JSX.Element {
  const { t, locale } = useI18n();
  useDocumentTitle(t.nav.knowledge);
  const years = getCurriculumYears();

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <header className="mb-10">
          <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
            {t.knowledge.indexEyebrow}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            {t.knowledge.indexTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-ink-muted">{t.knowledge.indexDescription}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ActionLink href={archiveSource.viewerUrl} emphasis="primary">
              <Icon name="book" className="h-4 w-4" />
              {t.knowledge.exploreArchive}
            </ActionLink>
            <ActionLink href={archiveSource.githubUrl} emphasis="secondary">
              <Icon name="github" className="h-4 w-4" />
              {t.knowledge.viewOnGithub}
            </ActionLink>
          </div>
        </header>

        <StatBand />

        <p className="mt-4 text-xs text-ink-faint">
          {t.knowledge.curriculumNote} {t.knowledge.sourceLanguage}
        </p>

        {years.map((year) => (
          <section key={year.id} aria-labelledby={`year-${year.id}`} className="mt-14">
            <div className="mb-5 flex items-baseline gap-3 border-b border-line pb-3">
              <h2 id={`year-${year.id}`} className="text-xl font-semibold sm:text-2xl">
                {yearLabel(year, locale)}
              </h2>
              <span className="font-mono text-xs text-ink-faint">
                {year.subjects.length} {t.metrics.subjects}
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {year.subjects.map((subject) => (
                <SubjectCard key={subject.slug} subject={subject} />
              ))}
            </div>
          </section>
        ))}
      </Container>
    </div>
  );
}
