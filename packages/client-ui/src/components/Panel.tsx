import { cn } from '@workspace/ui/lib/utils';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

function Panel({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'div'> & { children?: ReactNode }) {
  return (
    <div
      className={cn('flex h-full w-full flex-col overflow-hidden', className)}
      {...props}
    >
      {children}
    </div>
  );
}

function PanelHeader({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'div'> & { children?: ReactNode }) {
  return (
    <div
      className={cn(
        'flex h-fit w-full rounded-t-lg border border-border bg-card px-4 py-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function PanelBody({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'div'> & { children?: ReactNode }) {
  return (
    <div
      className={cn(
        'flex h-full w-full scrollbar-gutter-stable flex-col overflow-auto rounded-b-lg border-r border-b border-l border-border bg-card px-4 py-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Panel, PanelHeader, PanelBody };
