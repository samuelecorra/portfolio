import type { Dictionary } from '@/i18n';

export interface NavItem {
  /** Key into `t.nav` — labels are translated, not stored here. */
  labelKey: keyof Pick<Dictionary['nav'], 'projects' | 'knowledge' | 'about'>;
  href: string;
}

/** Primary navigation. Adding a top-level route means adding one entry here. */
export const navItems: NavItem[] = [
  { labelKey: 'projects', href: '/projects' },
  { labelKey: 'knowledge', href: '/knowledge' },
  { labelKey: 'about', href: '/about' },
];
