import { Link } from 'react-router';

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  return (
    <div>
      Home Page
      <Link to={'/documents/test'}>go to doc</Link>
    </div>
  );
}
