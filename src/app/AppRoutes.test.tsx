import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { AppRoutes } from './AppRoutes';

function renderAt(path: string): void {
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe('routing', () => {
  it('renders the homepage with a single h1', () => {
    renderAt('/');
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
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

  it('renders the knowledge index', () => {
    renderAt('/knowledge');
    expect(screen.getByRole('heading', { level: 2, name: /competence/i })).toBeInTheDocument();
  });

  it('renders a not-found page for an unknown route', () => {
    renderAt('/nope');
    expect(screen.getByRole('heading', { level: 1, name: /page not found/i })).toBeInTheDocument();
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
