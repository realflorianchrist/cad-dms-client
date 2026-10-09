import { useDirectory } from '@workspace/api/react';
import { useParams } from 'react-router';

export default function Footer() {
  const { directoryId = '' } = useParams<{ directoryId: string }>();

  const query = useDirectory(directoryId);
  const directory = query.data;

  return (
    <div className={'flex gap-2 px-4 py-2 text-xs'}>
      <span>{directory?.directories.length ?? 0} Directories</span>
      <span>{directory?.documents.length ?? 0} Documents</span>
    </div>
  );
}
