import { useProjects } from '@workspace/api/react';
import paths from '@workspace/client-ui/paths';
import { Link } from 'react-router';
import { Panel, PanelBody, PanelHeader } from '../Panel';

export default function Projects() {
  const projects = useProjects();

  return (
    <Panel>
      <PanelHeader>projects overview</PanelHeader>
      <PanelBody>
        <Link to={paths.project.to('test-project')}>go to test project</Link>

        <ul>
          {projects.data?.map((project) => (
            <li key={project.projectId}>{project.name}</li>
          ))}
        </ul>
      </PanelBody>
    </Panel>
  );
}
