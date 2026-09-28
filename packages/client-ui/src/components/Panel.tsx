import { cn } from '@workspace/ui/lib/utils';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export default function Panel({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'div'> & { children?: ReactNode }) {
  return (
    <div
      className={cn(
        'flex h-full w-full rounded-xl border border-border bg-gray-900',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
