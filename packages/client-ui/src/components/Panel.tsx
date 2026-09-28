import { cn } from '@workspace/ui/lib/utils';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

function Panel({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'div'> & { children?: ReactNode }) {
  return (
    <div className={cn('flex h-full w-full flex-col', className)} {...props}>
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
        'flex h-fit w-full rounded-t-xl border border-border bg-gray-900 px-4 py-2',
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
        'flex h-full w-full rounded-b-xl border-r border-b border-l border-border bg-gray-900 px-4 py-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Panel, PanelHeader, PanelBody };
