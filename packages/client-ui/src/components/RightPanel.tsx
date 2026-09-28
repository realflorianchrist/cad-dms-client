import { useParams } from 'react-router';
import Panel from './Panel';

export default function RightPanel() {
  const { id } = useParams<{ id: string }>();

  return (
    <aside className={'h-full overflow-y-auto'}>
      <Panel className={'px-4 py-2'}>Properties to {id}</Panel>
    </aside>
  );
}
