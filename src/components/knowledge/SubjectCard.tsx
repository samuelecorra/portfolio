import type { JSX } from 'react';
import { Link } from 'react-router';

import { subjectName, type CurriculumSubject } from '@/data/curriculum';
import { subjectSummaries } from '@/data/subjectSummaries';
import { localize, useI18n } from '@/i18n';

interface SubjectCardProps {
  subject: CurriculumSubject;
}

export function SubjectCard({ subject }: SubjectCardProps): JSX.Element {
  const { t, locale } = useI18n();
  const name = subjectName(subject, locale);
  const headingId = `subject-${subject.slug}-title`;
  const summary = subjectSummaries[subject.slug];

  return (
    <article
      aria-labelledby={headingId}
      className="flex flex-col gap-3 rounded-(--radius-card) border border-line bg-surface p-5 transition-colors duration-(--duration-base) focus-within:border-line-strong hover:border-line-strong"
    >
      <div>
        <h3 id={headingId} className="leading-snug font-semibold">
          <Link to={`/knowledge/${subject.slug}`} className="hover:text-accent">
            {name}
          </Link>
        </h3>
        {/* Il nome italiano dell'archivio resta visibile quando differisce, così
            l'etichetta a schermo corrisponde alla cartella in cui si atterra. */}
        {name !== subject.title ? (
          <p className="mt-1 font-mono text-xs text-ink-faint">{subject.title}</p>
        ) : null}
      </div>

      {/*
       * Le card raccontano di cosa tratta la materia, non quanti file contiene.
       * I conteggi restano sulla pagina di dettaglio, dove hanno un contesto.
       */}
      {summary ? (
        <p className="text-sm leading-relaxed text-ink-muted">{localize(summary, locale)}</p>
      ) : null}

      <Link
        to={`/knowledge/${subject.slug}`}
        className="mt-auto pt-1 text-sm text-accent hover:underline"
      >
        {t.knowledge.contents} →
      </Link>
    </article>
  );
}
