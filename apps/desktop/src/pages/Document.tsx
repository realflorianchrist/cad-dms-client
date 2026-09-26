import paths from '@/paths';
import { Link, useParams } from 'react-router';

export default function Document() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      Document: {id}
      <Link to={paths.home.path}>back home</Link>
    </div>
  );
}
