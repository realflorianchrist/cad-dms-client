import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@workspace/ui/components/resizable';
import { Separator } from '@workspace/ui/components/separator';
import { Outlet } from 'react-router';
import LeftPanel from '../LeftPanel';
import MainPanel from '../MainPanel';
import RightPanel from '../RightPanel';

export default function Layout() {
  return (
    <>
      <div className={'flex flex-col bg-card px-4'}>
        <header className={'flex w-full items-center'}>header</header>
        <div>Tools</div>
      </div>
      <Separator />
      <ResizablePanelGroup
        orientation={'horizontal'}
        className={'flex h-full flex-1'}
      >
        <ResizablePanel defaultSize={'15'} minSize={'10'} maxSize={'40'}>
          <LeftPanel />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={'70'}>
          <MainPanel>
            <Outlet />
          </MainPanel>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={'15'} minSize={'10'} maxSize={'40'}>
          <RightPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
      <Separator />
      <footer>footer</footer>
    </>
  );
}
