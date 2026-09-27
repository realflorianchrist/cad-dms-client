import paths from '@workspace/client-ui/paths';
import { Link, useParams } from 'react-router';

export default function Directory() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <div>Directory: {id}</div>
      <Link to={paths.project.to('test-project')}>back to test project</Link>
    </div>
  );
}
