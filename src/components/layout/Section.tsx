import type { JSX, ReactNode } from 'react';

import { cn } from '@/lib/cn';

import { Container } from './Container';

interface SectionProps {
  /** Anchor target and the id the heading is associated with. */
  id: string;
  title: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  /** Set to 1 only for the page's single top-level heading. */
  headingLevel?: 2 | 3;
}

/**
 * A titled landmark section.
 *
 * Every section is a real <section> labelled by its own heading, which is what
 * lets screen-reader users navigate the page by landmark and by heading.
 * Heading order is the caller's responsibility — see docs/DESIGN_SYSTEM.md.
 */
export function Section({
  id,
  title,
  eyebrow,
  description,
  children,
  className,
  headingLevel = 2,
}: SectionProps): JSX.Element {
  const headingId = `${id}-heading`;
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn('py-16 sm:py-20 lg:py-24', className)}
    >
      <Container>
        <header className="mb-8 sm:mb-10">
          {eyebrow ? (
            <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
              {eyebrow}
            </p>
          ) : null}
          <Heading id={headingId} className="text-2xl font-semibold sm:text-3xl">
            {title}
          </Heading>
          {description ? (
            <p className="mt-3 max-w-2xl text-base text-ink-muted">{description}</p>
          ) : null}
        </header>
        {children}
      </Container>
    </section>
  );
}
