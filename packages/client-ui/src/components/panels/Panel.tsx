import { cn } from '@workspace/ui/lib/utils';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';

function Panel({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'div'> & { children?: ReactNode }) {
  return (
    <div
      className={cn(
        'neu-shadow-inset flex h-full w-full flex-col overflow-hidden rounded-lg px-4 py-2',
        className
      )}
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
      className={cn('flex h-fit w-full items-center pb-2', className)}
      {...props}
    >
      {children}
      <IoClose className={'ml-auto'} />
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
        'flex min-h-0 w-full flex-1 scrollbar-gutter-stable flex-col overflow-auto pt-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Panel, PanelBody, PanelHeader };
