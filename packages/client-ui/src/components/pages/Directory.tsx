import paths from '@workspace/client-ui/paths';
import { Link, useParams } from 'react-router';
import { Panel, PanelBody, PanelHeader } from '../Panel';

export default function Directory() {
  const { id } = useParams<{ id: string }>();

  return (
    <Panel>
      <PanelHeader>Directory: {id}</PanelHeader>
      <PanelBody>
        <Link to={paths.project.to('test-project')}>back to test project</Link>
      </PanelBody>
    </Panel>
  );
}
