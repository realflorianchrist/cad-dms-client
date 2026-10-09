import { cn } from 'cn';
import * as ResizablePrimitive from 'react-resizable-panels';

function ResizablePanelGroup({
  className,
  ...props
}: ResizablePrimitive.GroupProps) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      className={cn(
        'flex h-full w-full aria-[orientation=vertical]:flex-col',
        className
      )}
      {...props}
    />
  );
}

function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({
  withHandle = true,
  className,
  ...props
}: ResizablePrimitive.SeparatorProps & {
  withHandle?: boolean;
}) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(
        'group relative flex w-2 items-center justify-center bg-background ring-offset-background after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden aria-[orientation=horizontal]:h-2 aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90',
        className
      )}
      {...props}
    >
      {withHandle && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 rounded-full bg-accent opacity-0 transition-opacity group-hover:opacity-100 group-aria-[orientation=horizontal]:inset-x-0 group-aria-[orientation=horizontal]:inset-y-auto group-aria-[orientation=horizontal]:top-1/2 group-aria-[orientation=horizontal]:h-1 group-aria-[orientation=horizontal]:w-auto group-aria-[orientation=horizontal]:translate-x-0 group-aria-[orientation=horizontal]:-translate-y-1/2"
        />
      )}
    </ResizablePrimitive.Separator>
  );
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
