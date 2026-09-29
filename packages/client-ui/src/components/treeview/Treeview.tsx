import { useProjects } from '@workspace/client-ui/api';
import ProjectTreeNode from './ProjectTreeNode';

export default function Treeview() {
  const queryResult = useProjects();

  if (queryResult.isLoading) return <div>loading...</div>;

  return (
    <div className={'h-full px-1'}>
      {queryResult.data?.map((project) => (
        <ProjectTreeNode key={project.projectId} project={project} />
      ))}
    </div>
  );
}
