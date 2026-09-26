import paths from '../../paths';
import { Link } from 'react-router';

export default function Home() {
  return (
    <div>
      Home Page
      <Link to={paths.documents.to('test')}>go to doc</Link>
    </div>
  );
}
