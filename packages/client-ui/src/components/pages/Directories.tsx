import { Link } from 'react-router';
import paths from '../../paths';
import { Panel, PanelBody, PanelHeader } from '../Panel';
import { useRootDirectories } from '../../../../api/src/hooks/useDirectories';

export default function Directories() {
  const query = useRootDirectories();

  return (
    <Panel>
      <PanelHeader>Directories</PanelHeader>
      <PanelBody>
        {query.isPending && <p>Loading directories...</p>}
        {query.isError && (
          <p role="alert">Could not load directories: {query.error.message}</p>
        )}
        {query.data?.length === 0 && <p>No directories.</p>}
        <ul>
          {query.data?.map((directory) => (
            <li key={directory.directoryId}>
              <Link to={paths.directory.to(directory.directoryId)}>
                {directory.name}
              </Link>
              {directory.archived && ' (archived)'}
            </li>
          ))}
        </ul>
      </PanelBody>
    </Panel>
  );
}
