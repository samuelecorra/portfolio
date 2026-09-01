import type { JSX, ReactNode } from 'react';
import { Link } from 'react-router';

import { cn } from '@/lib/cn';
import { externalLinkAttrs, isInternalHref } from '@/lib/links';

type Emphasis = 'primary' | 'secondary' | 'ghost';

interface ActionLinkProps {
  href: string;
  children: ReactNode;
  emphasis?: Emphasis;
  className?: string;
  /** Overrides the accessible name when the visible text is not enough. */
  ariaLabel?: string;
}

const BASE =
  'inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-(--duration-fast)';

const EMPHASIS: Record<Emphasis, string> = {
  primary: 'bg-accent text-base hover:bg-accent-strong',
  secondary: 'border border-line-strong text-ink hover:border-accent hover:text-accent',
  ghost: 'text-ink-muted hover:text-ink',
};

/**
 * The single link primitive.
 *
 * Routes internal hrefs through the router and sends external ones out with
 * the correct rel/target. Renders a real <a>/<Link> — never a button with an
 * onClick navigation — so keyboard, middle-click and "open in new tab" work.
 */
export function ActionLink({
  href,
  children,
  emphasis = 'secondary',
  className,
  ariaLabel,
}: ActionLinkProps): JSX.Element {
  const classes = cn(BASE, EMPHASIS[emphasis], className);

  if (isInternalHref(href)) {
    return (
      <Link to={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} aria-label={ariaLabel} {...externalLinkAttrs}>
      {children}
    </a>
  );
}
