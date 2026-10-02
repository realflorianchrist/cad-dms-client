import { useApiQuery } from '../client/reactQuery';
import {
  DirectoryDocument,
  type DirectoryQueryVariables,
} from '../generated/graphql';

export const useDirectory = (
  directoryId: DirectoryQueryVariables['directoryId'],
  options: { enabled?: boolean } = {}
) =>
  useApiQuery(DirectoryDocument, {
    queryKey: ['directory'],
    variables: { directoryId },
    queryOptions: {
      ...options,
      select: (data) => data.directory,
    },
  });
