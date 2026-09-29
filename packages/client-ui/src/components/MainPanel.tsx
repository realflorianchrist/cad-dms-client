import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@workspace/ui/components/resizable';
import { useParams } from 'react-router';
import { Panel, PanelBody, PanelHeader } from './Panel';
import type { ReactNode } from 'react';

export default function MainPanel({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { id } = useParams<{ id: string }>();

  return (
    <ResizablePanelGroup
      orientation={'vertical'}
      className={'flex w-full flex-1'}
    >
      <ResizablePanel defaultSize={'70'} minSize={'20'} maxSize={'80'}>
        <main className={'h-full overflow-y-auto'}>{children}</main>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <Panel>
          <PanelHeader>Infos</PanelHeader>
          <PanelBody>to {id}</PanelBody>
        </Panel>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
