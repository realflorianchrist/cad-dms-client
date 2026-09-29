import { useApiQuery } from '../client/reactQuery';
import {
  ProjectDocument,
  type ProjectQueryVariables,
} from '../generated/graphql';

export function useProject(projectId: ProjectQueryVariables['projectId']) {
  return useApiQuery(ProjectDocument, {
    queryKey: ['project'],
    variables: { projectId },
    queryOptions: {
      select: (data) => data.project,
    },
  });
}
