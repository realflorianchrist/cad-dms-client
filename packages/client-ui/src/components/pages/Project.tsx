import paths from '@workspace/client-ui/paths';
import { Link, useParams } from 'react-router';
import { Panel, PanelBody, PanelHeader } from '../Panel';

export default function Project() {
  const { id } = useParams<{ id: string }>();

  return (
    <Panel>
      <PanelHeader>Project: {id}</PanelHeader>
      <PanelBody>
        <Link to={paths.projects.path}>back to projects overview</Link>
        <Link to={paths.directory.to('test-directory')}>
          go to test directory
        </Link>
      </PanelBody>
    </Panel>
  );
}
