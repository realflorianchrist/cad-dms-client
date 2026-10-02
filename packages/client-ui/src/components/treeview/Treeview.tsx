import DirectoryTreeNode from './DirectoryTreeNode';
import { useRootDirectories } from '../../../../api/src/hooks/useDirectories';

export default function Treeview() {
  const query = useRootDirectories();

  if (query.isPending) return <div>Loading directories...</div>;

  if (query.isError)
    return (
      <div role="alert">Could not load directories: {query.error.message}</div>
    );

  return (
    <div className="h-full px-1">
      {query.data.length === 0 && <p>No directories.</p>}
      {query.data.map((directory) => (
        <DirectoryTreeNode key={directory.directoryId} directory={directory} />
      ))}
    </div>
  );
}
