import { useApiQuery } from '../client/reactQuery';
import { ProjectsDocument } from '../generated/graphql';

export function useProjects() {
  return useApiQuery(ProjectsDocument, {
    queryKey: ['projects'],
    queryOptions: {
      select: (data) => data.projects,
    },
  });
}
