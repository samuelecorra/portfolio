import type { JSX, ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** The single horizontal rhythm for the whole site. Change it here only. */
export function Container({ children, className }: ContainerProps): JSX.Element {
  return (
    <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12', className)}>
      {children}
    </div>
  );
}
