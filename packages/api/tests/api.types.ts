import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { useApiMutation, useApiQuery } from '../src/client/reactQuery';
import { ProjectDocument, ProjectsDocument } from '../src/generated/graphql';

// Compile-only regression checks; never rendered or executed.
export function useApiTypeChecks() {
  const projects = useApiQuery(ProjectsDocument, {
    queryKey: ['projects'],
    queryOptions: { select: (data) => data.projects },
  });
  const name: string | undefined = projects.data?.[0]?.name;
  // @ts-expect-error Only selected fields exist in the result.
  void projects.data?.[0]?.createdAt;

  useApiQuery(ProjectDocument, {
    queryKey: ['project'],
    variables: { projectId: 'id' },
  });
  // @ts-expect-error Project requires variables.
  useApiQuery(ProjectDocument, { queryKey: ['project'] });
  useApiQuery(ProjectDocument, {
    queryKey: ['project'],
    // @ts-expect-error Boolean is not a GraphQL ID.
    variables: { projectId: true },
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
