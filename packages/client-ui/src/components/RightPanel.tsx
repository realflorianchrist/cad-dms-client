import { useDirectory, useDocument } from '@workspace/api/react';
import { useParams } from 'react-router';
import { Panel, PanelBody, PanelHeader } from './Panel';

// TODO: add metadata components
export default function RightPanel() {
  const { directoryId = '', id = '' } = useParams<{
    directoryId: string;
    id: string;
  }>();

  const directoryQuery = useDirectory(id);
  const directory = directoryQuery.data;

  const documentQuery = useDocument(directoryId, id);
  const document = documentQuery.data;

  return (
    <aside className={'h-full overflow-y-auto'}>
      <Panel>
        <PanelHeader>Properties</PanelHeader>
        <PanelBody>
          to {document?.currentVersion.name || directory?.name}
        </PanelBody>
      </Panel>
    </aside>
  );
}
