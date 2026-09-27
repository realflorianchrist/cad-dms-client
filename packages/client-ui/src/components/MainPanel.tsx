import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@workspace/ui/components/resizable';
import * as React from 'react';
import { useParams } from 'react-router';

type MainPanelProps = {
  children: React.ReactNode;
};

export default function MainPanel({ children }: Readonly<MainPanelProps>) {
  const { id } = useParams<{ id: string }>();

  return (
    <ResizablePanelGroup
      orientation={'vertical'}
      className={'flex w-full flex-1'}
    >
      <ResizablePanel
        defaultSize={'70'}
        minSize={'20'}
        maxSize={'80'}
        className={'px-4 py-2'}
      >
        <main className={'h-full overflow-y-auto'}>{children}</main>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className={'px-4 py-2'}>
        <div>infos to {id}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
