import { useParams } from 'react-router';

export default function RightPanel() {
  const { id } = useParams<{ id: string }>();

  return (
    <aside className={'h-full overflow-y-auto px-4 py-2'}>
      Properties to {id}
    </aside>
  );
}
