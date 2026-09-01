import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it } from 'vitest';

import { AppRoutes } from '@/app/AppRoutes';

import { I18nProvider } from './I18nProvider';
import { de } from './de';
import { en } from './en';
import { it as itDict } from './it';
import { LOCALES } from './locales';

function renderApp(path = '/'): void {
  render(
    <I18nProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </I18nProvider>,
  );
}

/** Every leaf string in a dictionary, as dot-paths. */
function leafPaths(value: unknown, prefix = ''): string[] {
  if (typeof value === 'string') return [prefix];
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      leafPaths(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [];
}

describe('dictionaries', () => {
  it('define exactly the same keys in every language', () => {
    const expected = leafPaths(en).sort();
    expect(leafPaths(itDict).sort()).toEqual(expected);
    expect(leafPaths(de).sort()).toEqual(expected);
  });

  it('contain no empty strings', () => {
    for (const dict of [en, itDict, de]) {
      const values = JSON.stringify(dict).match(/"[^"]*"/g) ?? [];
      expect(values.filter((value) => value === '""')).toEqual([]);
    }
  });

  it('actually translate — Italian and German differ from English', () => {
    // Guards against a locale file copy-pasted from en.ts and never translated.
    expect(itDict.nav.projects).not.toBe(en.nav.projects);
    expect(de.nav.projects).not.toBe(en.nav.projects);
    expect(itDict.notFound.title).not.toBe(en.notFound.title);
    expect(de.notFound.title).not.toBe(en.notFound.title);
  });
});

describe('language switching', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = '';
  });

  it('offers every supported locale in the navbar picker', () => {
    renderApp();
    const select = screen.getByRole('combobox', { name: /language/i });
    expect(select).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(LOCALES.length);
  });

  it('translates the page and updates <html lang> when the locale changes', async () => {
    const user = userEvent.setup();
    renderApp();

    expect(screen.getByRole('link', { name: en.nav.projects })).toBeInTheDocument();

    await user.selectOptions(screen.getByRole('combobox', { name: /language/i }), 'it');

    expect(await screen.findByRole('link', { name: itDict.nav.projects })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('it');
    expect(screen.queryByRole('link', { name: en.nav.projects })).toBeNull();
  });

  it('persists the choice so a reload keeps the language', async () => {
    const user = userEvent.setup();
    renderApp();

    await user.selectOptions(screen.getByRole('combobox', { name: /language/i }), 'de');

    expect(window.localStorage.getItem('portfolio.locale')).toBe('de');
    expect(document.documentElement.lang).toBe('de');
  });
});
