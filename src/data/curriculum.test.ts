import { describe, expect, it } from 'vitest';

import { LOCALES } from '@/i18n';

import {
  archiveTotals,
  getAllSubjects,
  getCurriculumYears,
  getDegreeYears,
  getSubjectBySlug,
  subjectName,
} from './curriculum';

describe('curriculum data', () => {
  it('covers three degree years plus extras', () => {
    expect(getDegreeYears()).toHaveLength(3);
    expect(getCurriculumYears().length).toBeGreaterThanOrEqual(3);
  });

  it('exposes substantially more than a handful of subjects', () => {
    // The hand-written version had six invented areas; the real curriculum has
    // far more. This guards against silently regressing to a stub.
    expect(getAllSubjects().length).toBeGreaterThanOrEqual(20);
  });

  it('names every subject in every locale, never blank', () => {
    for (const subject of getAllSubjects()) {
      for (const locale of LOCALES) {
        const name = subjectName(subject, locale);
        expect(name, `${subject.slug} @ ${locale}`).toBeTruthy();
        // A missing translation must fall back to the Italian title, not to a
        // truncated key or an empty string.
        expect(name.length, `${subject.slug} @ ${locale}`).toBeGreaterThan(1);
      }
    }
  });

  it('gives every subject a resolvable archive and GitHub URL', () => {
    for (const subject of getAllSubjects()) {
      expect(subject.viewerUrl).toMatch(/^https:\/\/samuelecorra\.github\.io\//);
      expect(subject.githubUrl).toMatch(/^https:\/\/github\.com\//);
      expect(subject.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('has unique slugs', () => {
    const slugs = getAllSubjects().map((subject) => subject.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('resolves a known slug and rejects an unknown one', () => {
    expect(getSubjectBySlug('anno2-crittografia')?.title).toBe('Crittografia');
    expect(getSubjectBySlug('nope')).toBeUndefined();
  });

  it('reports totals consistent with the per-subject counts', () => {
    const summed = getAllSubjects().reduce((acc, s) => acc + s.counts.files, 0);
    expect(archiveTotals.files).toBe(summed);
    expect(archiveTotals.subjects).toBe(getAllSubjects().length);
    expect(archiveTotals.notes).toBeGreaterThan(1000);
  });
});
