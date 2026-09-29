import { useParams } from 'react-router';
import { Panel, PanelBody, PanelHeader } from './Panel';

export default function RightPanel() {
  const { id } = useParams<{ id: string }>();

  return (
    <aside className={'h-full overflow-y-auto'}>
      <Panel>
        <PanelHeader>Properties</PanelHeader>
        <PanelBody>to {id}</PanelBody>
      </Panel>
    </aside>
  );
}
