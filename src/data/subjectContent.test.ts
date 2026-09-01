import { describe, expect, it } from 'vitest';

import { LOCALES } from '@/i18n';

import { getAllSubjects } from './curriculum';
import { subjectEssays } from './subjectEssays';
import { subjectSummaries } from './subjectSummaries';

const subjects = getAllSubjects();

describe('subject summaries', () => {
  it('covers every subject in every locale', () => {
    for (const subject of subjects) {
      const summary = subjectSummaries[subject.slug];
      expect(summary, `missing summary for ${subject.slug}`).toBeDefined();

      for (const locale of LOCALES) {
        const text = summary?.[locale] ?? '';
        expect(text.length, `${subject.slug} @ ${locale}`).toBeGreaterThan(80);
      }
    }
  });

  it('has no orphan entries pointing at subjects that no longer exist', () => {
    const slugs = new Set(subjects.map((subject) => subject.slug));
    const orphans = Object.keys(subjectSummaries).filter((slug) => !slugs.has(slug));

    expect(orphans).toEqual([]);
  });

  it('is actually translated, not copy-pasted across locales', () => {
    for (const subject of subjects) {
      const summary = subjectSummaries[subject.slug];
      expect(summary?.it, `${subject.slug} it/en identical`).not.toBe(summary?.en);
      expect(summary?.de, `${subject.slug} de/en identical`).not.toBe(summary?.en);
    }
  });
});

describe('subject essays', () => {
  it('covers every subject in every locale with real paragraphs', () => {
    for (const subject of subjects) {
      const essay = subjectEssays[subject.slug];
      expect(essay, `missing essay for ${subject.slug}`).toBeDefined();

      for (const locale of LOCALES) {
        const paragraphs = essay?.[locale] ?? [];
        expect(paragraphs.length, `${subject.slug} @ ${locale}`).toBeGreaterThanOrEqual(2);

        for (const paragraph of paragraphs) {
          // 80 rather than something higher: the two extra-curricular sections
          // genuinely have little to say, and padding them to clear an
          // arbitrary bar would be the filler prose this site refuses to ship.
          // The bar exists to catch stubs, not to force verbosity.
          expect(paragraph.length, `${subject.slug} @ ${locale} short paragraph`).toBeGreaterThan(
            80,
          );
        }
      }
    }
  });

  it('keeps the same paragraph count across locales', () => {
    // A mismatch means a paragraph was dropped in translation.
    for (const subject of subjects) {
      const essay = subjectEssays[subject.slug];
      const counts = LOCALES.map((locale) => essay?.[locale]?.length ?? 0);

      expect(new Set(counts).size, `${subject.slug} paragraph counts ${counts.join('/')}`).toBe(1);
    }
  });

  it('has no orphan entries', () => {
    const slugs = new Set(subjects.map((subject) => subject.slug));
    const orphans = Object.keys(subjectEssays).filter((slug) => !slugs.has(slug));

    expect(orphans).toEqual([]);
  });
});
