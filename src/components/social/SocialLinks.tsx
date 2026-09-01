import type { JSX } from 'react';

import { Icon } from '@/components/ui/Icon';
import { getAvailableSocials } from '@/data/socials';
import { cn } from '@/lib/cn';
import { externalLinkAttrs } from '@/lib/links';

interface SocialLinksProps {
  variant?: 'default' | 'compact';
  className?: string;
}

/**
 * Renders only the socials that have a confirmed URL.
 *
 * Platforms still awaiting a URL in `src/data/socials.ts` are omitted entirely
 * rather than shown disabled — a dead icon is worse than no icon.
 */
export function SocialLinks({ variant = 'default', className }: SocialLinksProps): JSX.Element {
  const available = getAvailableSocials();

  return (
    <ul className={cn('flex flex-wrap items-center gap-2', className)}>
      {available.map((social) => (
        <li key={social.id}>
          <a
            href={social.url}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm text-ink-muted transition-colors duration-(--duration-fast) hover:border-accent hover:text-accent',
              variant === 'compact' && 'border-0 px-2',
            )}
            aria-label={social.handle ? `${social.label} (${social.handle})` : social.label}
            {...externalLinkAttrs}
          >
            <Icon name={social.icon} className="h-4 w-4" />
            {variant === 'default' ? <span>{social.label}</span> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
