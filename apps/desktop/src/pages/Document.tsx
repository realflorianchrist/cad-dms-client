import { Link, useParams } from 'react-router';

export interface IDocumentProps {}

export default function Document(props: IDocumentProps) {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      Document: {id}
      <Link to={'/'}>back home</Link>
    </div>
  );
}
