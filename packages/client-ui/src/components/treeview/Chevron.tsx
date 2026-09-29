import { cn } from '@workspace/ui/lib/utils';
import type { ComponentPropsWithoutRef } from 'react';
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc';

export default function Chevron({
  isVisible,
  isOpen,
  setIsOpen,
  className,
  ...props
}: ComponentPropsWithoutRef<'div'> & {
  isVisible: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <div className={cn('flex w-8 justify-center', className)} {...props}>
      {isVisible && (
        <button
          className={'cursor-pointer'}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? <VscChevronDown /> : <VscChevronRight />}
        </button>
      )}
    </div>
  );
}
