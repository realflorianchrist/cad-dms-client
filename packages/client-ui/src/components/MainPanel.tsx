import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@workspace/ui/components/resizable';
import { useParams } from 'react-router';
import Panel from './Panel';
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
        <main className={'h-full overflow-y-auto'}>
          <Panel className={'px-4 py-2'}>{children}</Panel>
        </main>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <Panel className={'px-4 py-2'}>infos to {id}</Panel>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
