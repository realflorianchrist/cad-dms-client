import { useApiQuery } from '../client/reactQuery';
import {
  DirectoriesDocument,
  RootDirectoriesDocument,
} from '../generated/graphql';

export const useRootDirectories = () =>
  useApiQuery(RootDirectoriesDocument, {
    queryKey: ['directories'],
    queryOptions: { select: (data) => data.rootDirectories },
  });

export const useDirectories = () =>
  useApiQuery(DirectoriesDocument, {
    queryKey: ['directories'],
    queryOptions: { select: (data) => data.directories },
  });
