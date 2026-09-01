/**
 * Supported locales.
 *
 * English is the source language and the fallback: it is the only dictionary
 * whose shape defines the contract, and the only one guaranteed complete.
 * Italian is Samuele's own language and the archive's source language; German
 * is here because the master's is in Lugano and Swiss readers matter.
 */
export const LOCALES = ['en', 'it', 'de'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleMeta {
  /** Endonym — a language picker should name languages in their own language. */
  label: string;
  /** BCP 47 tag for the <html lang> attribute. */
  htmlLang: string;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: { label: 'English', htmlLang: 'en' },
  it: { label: 'Italiano', htmlLang: 'it' },
  de: { label: 'Deutsch', htmlLang: 'de' },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/**
 * Text that exists in every supported language.
 *
 * Used for editorial content in `src/data/**`. Content that is a source
 * artefact — a repository folder name, a lesson title written in Italian —
 * deliberately does NOT use this type: see docs/CONTENT_MODEL.md § Language.
 */
export type LocalizedText = Record<Locale, string>;

export type LocalizedList = Record<Locale, string[]>;

export function localize(text: LocalizedText, locale: Locale): string {
  return text[locale] || text[DEFAULT_LOCALE];
}

export function localizeList(list: LocalizedList, locale: Locale): string[] {
  const value = list[locale];
  return value.length > 0 ? value : list[DEFAULT_LOCALE];
}
