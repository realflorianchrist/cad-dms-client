import { useDocument } from '@workspace/api/react';
import { Link, useParams } from 'react-router';
import paths from '../../paths';
import { Panel, PanelBody, PanelHeader } from '../Panel';
export default function Document() {
  const { directoryId = '', id = '' } = useParams<{
    directoryId: string;
    id: string;
  }>();
  const query = useDocument(directoryId, id);
  const document = query.data;
  return (
    <Panel>
      <PanelHeader>
        {document?.currentVersion.name ?? 'Document'}
        {document?.archived && ' (archived)'}
      </PanelHeader>
      <PanelBody className="gap-4">
        <Link to={paths.directory.to(directoryId)}>Back to directory</Link>
        {query.isPending && <p>Loading document...</p>}
        {query.isError && (
          <p role="alert">Could not load document: {query.error.message}</p>
        )}
        {document === null && <p>Document not found.</p>}
        {document && (
          <>
            <p>
              Current version: {document.currentVersion.number} - Extension:{' '}
              {document.currentVersion.extension || 'none'}
            </p>
            <section>
              <h2>Versions</h2>
              <ul>
                {document.versions.map((version) => (
                  <li key={version.documentVersionId}>
                    Version {version.number}: {version.name}
                    {version.extension && ' (.' + version.extension + ')'}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2>Metadata</h2>
              {document.metadataValues.length === 0 && <p>No metadata.</p>}
              <dl>
                {document.metadataValues.map((metadata) => (
                  <div key={metadata.definition.metadataDefinitionId}>
                    <dt>{metadata.definition.label}</dt>
                    <dd>{metadata.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </>
        )}
      </PanelBody>
    </Panel>
  );
}
