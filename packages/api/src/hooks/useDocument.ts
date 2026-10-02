import { useApiQuery } from '../client/reactQuery';
import { DirectoryDocument } from '../generated/graphql';

export const useDocument = (directoryId: string, documentId: string) =>
  useApiQuery(DirectoryDocument, {
    queryKey: ['directory'],
    variables: { directoryId },
    queryOptions: {
      select: (data) =>
        data.directory?.documents.find(
          (document) => document.documentId === documentId
        ) ?? null,
    },
  });
