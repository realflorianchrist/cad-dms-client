import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { useDocument } from '../src/hooks/useDocument';
import { useApiMutation, useApiQuery } from '../src/client/reactQuery';
import {
  DirectoryDocument,
  DirectoriesDocument,
} from '../src/generated/graphql';

// Compile-only regression checks; never rendered or executed.
export function useApiTypeChecks() {
  const document = useDocument('directory-id', 'document-id');
  const documentName: string | undefined = document.data?.currentVersion.name;
  const versionNumber: number | undefined =
    document.data?.currentVersion.number;
  // @ts-expect-error Document names belong to versions.
  void document.data?.name;
  void documentName;
  void versionNumber;
  const directories = useApiQuery(DirectoriesDocument, {
    queryKey: ['directories'],
    queryOptions: { select: (data) => data.directories },
  });
  const name: string | undefined = directories.data?.[0]?.name;
  // @ts-expect-error Only selected fields exist in the result.
  void directories.data?.[0]?.createdAt;

  useApiQuery(DirectoryDocument, {
    queryKey: ['directory'],
    variables: { directoryId: 'id' },
  });
  // @ts-expect-error Directory requires variables.
  useApiQuery(DirectoryDocument, { queryKey: ['directory'] });
  useApiQuery(DirectoryDocument, {
    queryKey: ['directory'],
    // @ts-expect-error Boolean is not a GraphQL ID.
    variables: { directoryId: true },
  });

  return name;
}

// Synthetic document type tests mutation inference without inventing backend fields.
export function useMutationTypeChecks(
  document: TypedDocumentNode<{ saved: boolean }, { name: string }>
) {
  const mutation = useApiMutation(document);
  mutation.mutate({ name: 'example' });
  // @ts-expect-error Required mutation variables cannot be omitted.
  mutation.mutate();
  // @ts-expect-error Wrong input type.
  mutation.mutate({ name: 123 });
  const saved: boolean | undefined = mutation.data?.saved;
  return saved;
}
