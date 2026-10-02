import { useDirectory } from '@workspace/api/react';
import { Link, useParams } from 'react-router';
import paths from '../../paths';
import { Panel, PanelBody, PanelHeader } from '../Panel';
export default function Directory() {
  const { id = '' } = useParams<{ id: string }>();
  const query = useDirectory(id);
  const directory = query.data;
  return (
    <Panel>
      <PanelHeader>
        {directory?.name ?? 'Directory'}
        {directory?.archived && ' (archived)'}
      </PanelHeader>
      <PanelBody className="gap-4">
        <Link to={paths.directories.path}>Back to directories</Link>
        {query.isPending && <p>Loading directory...</p>}
        {query.isError && (
          <p role="alert">Could not load directory: {query.error.message}</p>
        )}
        {directory === null && <p>Directory not found.</p>}
        {directory && (
          <>
            <section>
              <h2>Directories</h2>
              {directory.directories.length === 0 && <p>No subdirectories.</p>}
              <ul>
                {directory.directories.map((child) => (
                  <li key={child.directoryId}>
                    <Link to={paths.directory.to(child.directoryId)}>
                      {child.name}
                    </Link>
                    {child.archived && ' (archived)'}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2>Documents</h2>
              {directory.documents.length === 0 && <p>No documents.</p>}
              <ul>
                {directory.documents.map((document) => (
                  <li key={document.documentId}>
                    <Link to={paths.document.to(id, document.documentId)}>
                      {document.currentVersion.name}
                      {document.currentVersion.extension &&
                        ' (.' + document.currentVersion.extension + ')'}
                    </Link>{' '}
                    - Version {document.currentVersion.number}
                    {document.archived && ' (archived)'}
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </PanelBody>
    </Panel>
  );
}
