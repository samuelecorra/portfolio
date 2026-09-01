import { createContext } from 'react';

import type { Dictionary } from './en';
import { DEFAULT_LOCALE, type Locale } from './locales';
import { en } from './en';

export interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** The active dictionary. Accessed as `t.nav.projects` — typed, not stringly. */
  t: Dictionary;
}

export const I18nContext = createContext<I18nContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => undefined,
  t: en,
});
