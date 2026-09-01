import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { I18nProvider } from '@/i18n';
import { describe, expect, it } from 'vitest';

import { AppRoutes } from './AppRoutes';

function renderAt(path: string): void {
  render(
    <I18nProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </I18nProvider>,
  );
}

describe('routing', () => {
  it('renders the homepage with a single h1', () => {
    renderAt('/');
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('shows every project on the homepage, with the archive featured', () => {
    renderAt('/');

    // Scoped to the work section: knowledge cards are <article> elements too.
    const work = screen.getByRole('region', { name: /selected work/i });

    expect(within(work).getAllByRole('article')).toHaveLength(4);
    expect(within(work).getByText(/^featured$/i)).toBeInTheDocument();
  });

  it('links the footer to the public source repository', () => {
    renderAt('/');

    // Exact name: the archive card's "View source on GitHub" CTA also matches
    // a loose substring query.
    expect(screen.getByRole('link', { name: 'Source on GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/samuelecorra/portfolio',
    );
  });

  it('renders the projects index', () => {
    renderAt('/projects');
    expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument();
  });

  it('renders a project detail page for a known slug', () => {
    renderAt('/projects/ironmath');
    expect(screen.getByRole('heading', { level: 1, name: 'IronMath' })).toBeInTheDocument();
  });

  it('falls back to the not-found page for an unknown project slug', () => {
    renderAt('/projects/not-a-real-project');
    expect(screen.getByRole('heading', { level: 1, name: /page not found/i })).toBeInTheDocument();
  });

  it('renders the knowledge index with the full curriculum', () => {
    renderAt('/knowledge');

    expect(
      screen.getByRole('heading', { level: 1, name: /three years, in full/i }),
    ).toBeInTheDocument();

    // Three degree years, each as its own labelled section.
    expect(screen.getByRole('heading', { level: 2, name: /year 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /year 3/i })).toBeInTheDocument();

    // Real subjects, not the six invented areas the page used to show.
    expect(screen.getByRole('heading', { name: /cryptography/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /database systems/i })).toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toBeGreaterThanOrEqual(20);
  });

  it('renders a subject page for a known slug', () => {
    renderAt('/knowledge/anno2-crittografia');

    expect(screen.getByRole('heading', { level: 1, name: /cryptography/i })).toBeInTheDocument();
    // The Italian original stays visible so the label matches the archive folder.
    expect(screen.getByText('Crittografia')).toBeInTheDocument();
  });

  it('falls back to the not-found page for an unknown subject slug', () => {
    renderAt('/knowledge/not-a-subject');
    expect(screen.getByRole('heading', { level: 1, name: /page not found/i })).toBeInTheDocument();
  });

  it('renders a not-found page for an unknown route', () => {
    renderAt('/nope');
    expect(screen.getByRole('heading', { level: 1, name: /page not found/i })).toBeInTheDocument();
  });

  it('never skips a heading level on the homepage', () => {
    renderAt('/');

    const levels = screen
      .getAllByRole('heading')
      .map((heading) => Number(heading.tagName.slice(1)));

    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i += 1) {
      // A jump from h2 straight to h4 breaks screen-reader navigation.
      expect(levels[i]! - levels[i - 1]!).toBeLessThanOrEqual(1);
    }
  });

  it('exposes the skip link and main landmark on every page', () => {
    renderAt('/about');
    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute(
      'href',
      '#main-content',
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
