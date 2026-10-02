import { cn } from '@workspace/ui/lib/utils';
import { type ReactNode } from 'react';

export default function TreeNode({
  depth = 0,
  children,
}: {
  depth?: number;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'flex cursor-pointer gap-2 text-sm select-none',
        'rounded-md py-1 hover:bg-accent/40'
      )}
      style={{ paddingLeft: `${depth * 0.5}rem` }}
    >
      <div className={'flex w-full flex-col'}>{children}</div>
    </div>
  );
}
