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
  query: string,
  variables?: object,
  operationName?: string
): QueryKey => [...key, { query, variables, operationName }];

export function useApiQuery<
  TData,
  TVariables extends object = Record<string, never>,
  TSelected = TData,
>(
  query: string,
  options: {
    queryKey: QueryKey;
    variables?: TVariables;
    operationName?: string;
    queryOptions?: Omit<
      UseQueryOptions<TData, Error, TSelected>,
      'queryFn' | 'queryKey'
    >;
  }
) {
  const transport = useApiTransport();
  const { queryKey, variables, operationName, queryOptions } = options;

  return useQuery<TData, Error, TSelected>({
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    gcTime: 30 * 60_000,
    ...queryOptions,
    queryKey: apiQueryKey(queryKey, query, variables, operationName),
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
  TVariables extends object | void = void,
  TOnMutateResult = unknown,
>(
  query: string,
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
