import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@workspace/ui/components/resizable';
import { Panel, PanelBody, PanelHeader } from './Panel';

export default function LeftPanel() {
  return (
    <nav aria-label="main-navigation" className={'h-full overflow-y-auto'}>
      <ResizablePanelGroup
        orientation={'vertical'}
        className={'flex w-full flex-1'}
      >
        <ResizablePanel maxSize={'80'}>
          <Panel>
            <PanelHeader>nav-1</PanelHeader>
            <PanelBody>tree</PanelBody>
          </Panel>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel maxSize={'80'}>
          <Panel>
            <PanelHeader>nav-2</PanelHeader>
            <PanelBody>tree</PanelBody>
          </Panel>
        </ResizablePanel>
      </ResizablePanelGroup>
    </nav>
  );
}
