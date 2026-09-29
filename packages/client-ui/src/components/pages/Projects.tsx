import { useProjects } from '@workspace/client-ui/api';
import paths from '@workspace/client-ui/paths';
import { Link } from 'react-router';

export default function Projects() {
  const projects = useProjects();

  return (
    <div>
      <div>projects overview</div>
      <Link to={paths.project.to('test-project')}>go to test project</Link>

      <ul>
        {projects.data?.map((project) => (
          <li key={project.projectId}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
}
