import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { print, type DocumentNode } from 'graphql';
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { useApiTransport } from './context';
import { executeGraphQL } from './graphql';

/** Variables and operation are always included to keep cache entries distinct. */
export const apiQueryKey = (
  key: QueryKey,
  document: DocumentNode,
  variables?: object,
  operationName?: string
): QueryKey => [...key, { query: print(document), variables, operationName }];

export function useApiQuery<
  TData,
  TVariables extends object = Record<string, never>,
  TSelected = TData,
>(
  document: TypedDocumentNode<TData, TVariables>,
  options: {
    queryKey: QueryKey;
    operationName?: string;
    queryOptions?: Omit<
      UseQueryOptions<TData, Error, TSelected>,
      'queryFn' | 'queryKey'
    >;
  } & (Record<string, never> extends TVariables
    ? { variables?: NoInfer<TVariables> }
    : { variables: NoInfer<TVariables> })
) {
  const transport = useApiTransport();
  const { queryKey, variables, operationName, queryOptions } = options;
  const query = print(document);

  return useQuery<TData, Error, TSelected>({
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    gcTime: 30 * 60_000,
    ...queryOptions,
    queryKey: apiQueryKey(queryKey, document, variables, operationName),
    queryFn: ({ signal }) =>
      executeGraphQL<TData>(
        transport,
        { query, variables, operationName },
        signal
      ),
  });
}

export function useApiMutation<
  TData,
  TVariables extends object = Record<string, never>,
  TOnMutateResult = unknown,
>(
  document: TypedDocumentNode<TData, TVariables>,
  options?: {
    operationName?: string;
    mutationOptions?: Omit<
      UseMutationOptions<TData, Error, TVariables, TOnMutateResult>,
      'mutationFn'
    >;
    invalidateKeys?:
      | readonly QueryKey[]
      | ((data: TData, variables: TVariables) => readonly QueryKey[]);
  }
) {
  const transport = useApiTransport();
  const queryClient = useQueryClient();
  const { operationName, mutationOptions, invalidateKeys } = options ?? {};
  const query = print(document);

  return useMutation<TData, Error, TVariables, TOnMutateResult>({
    ...mutationOptions,
    mutationFn: (variables) =>
      executeGraphQL<TData>(transport, {
        query,
        variables: variables === undefined ? undefined : variables,
        operationName,
      }),
    onSuccess: async (data, variables, onMutateResult, context) => {
      const keys =
        typeof invalidateKeys === 'function'
          ? invalidateKeys(data, variables)
          : invalidateKeys;

      await Promise.all(
        (keys ?? []).map((queryKey) =>
          queryClient.invalidateQueries({ queryKey })
        )
      );

      await mutationOptions?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context
      );
    },
  });
}
