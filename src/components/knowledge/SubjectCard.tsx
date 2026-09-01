import type { JSX } from 'react';
import { Link } from 'react-router';

import { subjectName, type CurriculumSubject } from '@/data/curriculum';
import { useI18n } from '@/i18n';

interface SubjectCardProps {
  subject: CurriculumSubject;
}

export function SubjectCard({ subject }: SubjectCardProps): JSX.Element {
  const { t, locale } = useI18n();
  const name = subjectName(subject, locale);
  const headingId = `subject-${subject.slug}-title`;
  const { counts } = subject;

  // Only surface metrics this subject actually has: several subjects store
  // material as loose files rather than modules, and zeroes read as absence
  // of work rather than a different filing structure.
  const metrics = [
    { value: counts.modules, label: t.metrics.modules },
    { value: counts.units, label: t.metrics.units },
    { value: counts.lessons, label: t.metrics.lessons },
    { value: counts.notes, label: t.metrics.notes },
    { value: counts.pdfs, label: t.metrics.pdfs },
    { value: counts.code, label: t.metrics.code },
  ].filter((metric) => metric.value > 0);

  return (
    <article
      aria-labelledby={headingId}
      className="flex flex-col gap-4 rounded-(--radius-card) border border-line bg-surface p-5 transition-colors duration-(--duration-base) focus-within:border-line-strong hover:border-line-strong"
    >
      <div>
        <h3 id={headingId} className="leading-snug font-semibold">
          <Link to={`/knowledge/${subject.slug}`} className="hover:text-accent">
            {name}
          </Link>
        </h3>
        {/* Show the archive's own Italian name when it differs, so the label on
            screen still matches the folder the reader will land in. */}
        {name !== subject.title ? (
          <p className="mt-1 font-mono text-xs text-ink-faint">{subject.title}</p>
        ) : null}
      </div>

      {metrics.length > 0 ? (
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-muted">
          {metrics.map((metric) => (
            <li key={metric.label}>
              <span className="font-mono text-ink">{metric.value.toLocaleString()}</span>{' '}
              {metric.label}
            </li>
          ))}
        </ul>
      ) : null}

      <Link
        to={`/knowledge/${subject.slug}`}
        className="mt-auto text-sm text-accent hover:underline"
      >
        {t.knowledge.contents} →
      </Link>
    </article>
  );
}
