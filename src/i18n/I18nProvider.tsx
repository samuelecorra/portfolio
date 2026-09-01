import { useCallback, useEffect, useMemo, useState, type JSX, type ReactNode } from 'react';

import { I18nContext, type I18nContextValue } from './context';
import { de } from './de';
import { en } from './en';
import { it } from './it';
import { DEFAULT_LOCALE, LOCALE_META, isLocale, type Locale } from './locales';

const DICTIONARIES = { en, it, de } as const;

const STORAGE_KEY = 'portfolio.locale';

/**
 * Resolves the initial locale: explicit choice, then browser preference, then
 * English. Read synchronously in the state initialiser so the first paint is
 * already in the right language instead of flashing English.
 *
 * Every storage access is guarded: private windows and blocked site data make
 * localStorage throw on access, not just return null.
 */
function detectInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // Storage unavailable — fall through to the browser preference.
  }

  for (const language of window.navigator.languages ?? [window.navigator.language]) {
    const base = language.split('-')[0];
    if (isLocale(base)) return base;
  }

  return DEFAULT_LOCALE;
}

export function I18nProvider({ children }: { children: ReactNode }): JSX.Element {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // A viewer who cannot persist still gets the language for this session.
    }
  }, []);

  // Keep <html lang> in sync: it drives screen-reader pronunciation and
  // hyphenation, and is the signal search engines read for page language.
  useEffect(() => {
    document.documentElement.lang = LOCALE_META[locale].htmlLang;
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t: DICTIONARIES[locale] }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
