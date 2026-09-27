import paths from '@workspace/client-ui/paths';
import { Link } from 'react-router';

export default function Projects() {
  return (
    <div>
      <div>projects overview</div>
      <Link to={paths.project.to('test-project')}>go to test project</Link>
    </div>
  );
}
