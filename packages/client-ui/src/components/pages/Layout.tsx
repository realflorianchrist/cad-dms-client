import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@workspace/ui/components/resizable';
import { Outlet } from 'react-router';
import Footer from '../Footer';
import LeftPanel from '../panels/LeftPanel';
import MainPanel from '../panels/MainPanel';
import RightPanel from '../panels/RightPanel';

export default function Layout() {
  return (
    <>
      <div className={'flex flex-col px-4'}>
        <header className={'flex w-full items-center'}>header</header>
        <div>Tools</div>
      </div>
      <ResizablePanelGroup
        orientation={'horizontal'}
        className={'flex h-full flex-1 px-2'}
      >
        <ResizablePanel defaultSize={'15'} minSize={'10'} maxSize={'40'}>
          <LeftPanel />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <MainPanel>
            <Outlet />
          </MainPanel>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={'15'} minSize={'10'} maxSize={'40'}>
          <RightPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
      <Footer />
    </>
  );
}
