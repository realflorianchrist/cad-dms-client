import paths from '@workspace/client-ui/paths';
import { Link, useParams } from 'react-router';

export default function Project() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className={'flex flex-col'}>
      <div>Project: {id}</div>
      <Link to={paths.projects.path}>back to projects overview</Link>
      <Link to={paths.directory.to('test-directory')}>
        go to test directory
      </Link>
    </div>
  );
}
