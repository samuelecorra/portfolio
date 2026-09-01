import { describe, expect, it } from 'vitest';

import { getAllProjects, getProjectBySlug, projects } from './projects';

describe('project data invariants', () => {
  it('never exposes a repository URL for non-public repositories', () => {
    // This is the guardrail for IronMath: its source must stay unlinkable.
    const leaked = projects.filter(
      (project) => project.repository.visibility !== 'public' && project.repository.url !== null,
    );

    expect(leaked).toEqual([]);
  });

  it('never links to github.com for a project whose repository is not public', () => {
    const offenders = projects
      .filter((project) => project.repository.visibility !== 'public')
      .flatMap((project) => project.links)
      .filter((link) => link.href.includes('github.com'));

    expect(offenders).toEqual([]);
  });

  it('gives every public repository an actual URL', () => {
    const missing = projects.filter(
      (project) => project.repository.visibility === 'public' && !project.repository.url,
    );

    expect(missing).toEqual([]);
  });

  it('has unique ids and slugs', () => {
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length);
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  });

  it('orders projects deterministically', () => {
    const orders = getAllProjects().map((project) => project.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  it('designates exactly one primary project', () => {
    // The visual hierarchy depends on this: two "featured" cards would read as
    // no hierarchy at all, and zero would flatten the grid.
    const primary = projects.filter((project) => project.emphasis === 'primary');

    expect(primary.map((project) => project.id)).toEqual(['cybersec-archive']);
  });

  it('resolves a known slug and rejects an unknown one', () => {
    expect(getProjectBySlug('ironmath')?.title).toBe('IronMath');
    expect(getProjectBySlug('does-not-exist')).toBeUndefined();
  });
});
