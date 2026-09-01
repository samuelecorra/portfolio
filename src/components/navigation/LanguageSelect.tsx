import { Languages } from 'lucide-react';
import { useId, type JSX } from 'react';

import { useI18n } from '@/i18n';
import { LOCALES, LOCALE_META, isLocale } from '@/i18n';
import { cn } from '@/lib/cn';

interface LanguageSelectProps {
  className?: string;
}

/**
 * Language picker.
 *
 * A native <select> on purpose: it is keyboard- and screen-reader-correct for
 * free, and on mobile it opens the platform picker rather than a custom
 * dropdown we would have to make accessible ourselves.
 *
 * Options are labelled with endonyms ("Italiano", not "Italian"), because
 * someone looking for their own language scans for it in that language.
 */
export function LanguageSelect({ className }: LanguageSelectProps): JSX.Element {
  const { locale, setLocale, t } = useI18n();
  const id = useId();

  return (
    <div className={cn('relative flex items-center', className)}>
      <label htmlFor={id} className="sr-only">
        {t.nav.language}
      </label>
      <Languages
        aria-hidden
        focusable={false}
        className="pointer-events-none absolute left-2 h-4 w-4 text-ink-faint"
      />
      <select
        id={id}
        value={locale}
        onChange={(event) => {
          const next = event.target.value;
          if (isLocale(next)) setLocale(next);
        }}
        className="appearance-none rounded-md border border-line bg-surface py-1.5 pr-3 pl-8 text-sm text-ink-muted transition-colors duration-(--duration-fast) hover:border-line-strong hover:text-ink"
      >
        {LOCALES.map((code) => (
          <option key={code} value={code} className="bg-surface text-ink">
            {LOCALE_META[code].label}
          </option>
        ))}
      </select>
    </div>
  );
}
