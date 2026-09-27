import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@workspace/ui/components/resizable';

export default function LeftPanel() {
  return (
    <nav aria-label="main-navigation" className={'h-full overflow-y-auto'}>
      <ResizablePanelGroup
        orientation={'vertical'}
        className={'flex w-full flex-1'}
      >
        <ResizablePanel maxSize={'80'} className={'px-4 py-2'}>
          nav-1
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel maxSize={'80'} className={'px-4 py-2'}>
          nav-2
        </ResizablePanel>
      </ResizablePanelGroup>
    </nav>
  );
}
