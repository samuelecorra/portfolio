import {
  ArrowUpRight,
  BookOpen,
  Code2,
  Database,
  Mail,
  Network,
  Shield,
  Sigma,
  type LucideIcon,
} from 'lucide-react';
import type { JSX } from 'react';

import type { IconName } from '@/types';

import { BrandIcon, type BrandName } from './BrandIcon';

const BRAND_NAMES = new Set<string>(['github', 'linkedin', 'youtube', 'x', 'instagram']);

const LUCIDE_ICONS: Record<Exclude<IconName, BrandName>, LucideIcon> = {
  mail: Mail,
  external: ArrowUpRight,
  book: BookOpen,
  shield: Shield,
  database: Database,
  network: Network,
  code: Code2,
  sigma: Sigma,
};

interface IconProps {
  name: IconName;
  className?: string;
}

/**
 * Resolves the semantic icon names used in `src/data/**` to actual components.
 *
 * This indirection is what lets the data layer stay plain, serialisable objects
 * with no React imports — a prerequisite for the planned generated-JSON path.
 * Icons are always decorative; labelling belongs to the surrounding control.
 */
export function Icon({ name, className = 'h-4 w-4' }: IconProps): JSX.Element {
  if (BRAND_NAMES.has(name)) {
    return <BrandIcon name={name as BrandName} className={className} />;
  }

  const LucideComponent = LUCIDE_ICONS[name as Exclude<IconName, BrandName>];
  return <LucideComponent className={className} aria-hidden focusable={false} />;
}
