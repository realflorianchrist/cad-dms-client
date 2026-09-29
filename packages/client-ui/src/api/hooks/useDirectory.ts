import { useApiQuery } from '../client/reactQuery';
import {
  DirectoryDocument,
  type DirectoryQueryVariables,
} from '../generated/graphql';

export function useDirectory(
  directoryId: DirectoryQueryVariables['directoryId']
) {
  return useApiQuery(DirectoryDocument, {
    queryKey: ['directory'],
    variables: { directoryId },
    queryOptions: {
      select: (data) => data.directory,
    },
  });
}
