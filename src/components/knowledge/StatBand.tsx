import type { JSX } from 'react';

import { getDegreeTotals, getDegreeYears } from '@/data/curriculum';
import { useI18n } from '@/i18n';

/**
 * The headline scale of the archive.
 *
 * Every number is generated from the archive manifest at build time — see
 * scripts/sync-archive.mjs. None of these are typed by hand, which is the whole
 * point: a claim about volume that nobody can reproduce is just a boast.
 */
export function StatBand(): JSX.Element {
  const { t } = useI18n();
  // Degree-only: the `extra` bucket is self-directed material, not coursework.
  const totals = getDegreeTotals();
  const stats = [
    { value: getDegreeYears().length, label: t.metrics.years },
    { value: totals.subjects, label: t.metrics.subjects },
    { value: totals.modules, label: t.metrics.modules },
    { value: totals.units, label: t.metrics.units },
    { value: totals.lessons, label: t.metrics.lessons },
    { value: totals.notes, label: t.metrics.notes },
  ];

  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-(--radius-card) border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-surface px-4 py-5 text-center sm:px-5">
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <span className="block font-mono text-2xl font-semibold text-accent sm:text-3xl">
              {stat.value.toLocaleString()}
            </span>
            <span className="mt-1 block text-xs text-ink-faint">{stat.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
