import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@workspace/ui/components/resizable';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <>
      <header className={'flex h-12 w-full items-center p-4'}>header</header>
      <ResizablePanelGroup
        orientation={'horizontal'}
        className={'flex h-full flex-1 px-4 py-2'}
      >
        <ResizablePanel
          defaultSize={'15'}
          minSize={'10'}
          maxSize={'40'}
          className={''}
        >
          <nav aria-label="main-navigation" className="h-full overflow-y-auto">
            navigation
          </nav>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={'85'} className={'h-full px-4 py-2'}>
          <main className="h-full overflow-y-auto">
            <Outlet />
          </main>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
