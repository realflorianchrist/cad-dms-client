export interface GraphQLRequest {
  query: string;
  variables?: object;
  operationName?: string;
}

export interface GraphQLResponseError {
  message: string;
  path?: ReadonlyArray<string | number>;
  extensions?: Record<string, unknown>;
}

export interface GraphQLResponse<TData = unknown> {
  data?: TData | null;
  errors?: readonly GraphQLResponseError[];
}

/** Return the GraphQL envelope, including errors, for both HTTP and IPC. */
export type GraphQLTransport = (
  request: GraphQLRequest,
  options?: { signal?: AbortSignal }
) => Promise<GraphQLResponse>;

export class GraphQLClientError extends Error {
  readonly errors: readonly GraphQLResponseError[];
  readonly status?: number;

  constructor(
    message: string,
    errors: readonly GraphQLResponseError[] = [],
    status?: number
  ) {
    super(message);
    this.name = 'GraphQLClientError';
    this.errors = errors;
    this.status = status;
  }
}

/** Strict error policy: partial data accompanied by errors is rejected. */
export async function executeGraphQL<TData>(
  transport: GraphQLTransport,
  request: GraphQLRequest,
  signal?: AbortSignal
): Promise<TData> {
  const result = await transport(request, { signal });
  if (result.errors?.length) {
    throw new GraphQLClientError(
      result.errors.map((error) => error.message).join('\n'),
      result.errors
    );
  }
  if (result.data == null) {
    throw new GraphQLClientError('GraphQL response contains no data');
  }
  return result.data as TData;
}

/** Use in the web app or Electron main process, with an app-owned endpoint. */
export function createHttpGraphQLTransport(
  endpoint: string,
  options: Omit<RequestInit, 'body' | 'method' | 'signal'> = {}
): GraphQLTransport {
  return async (request, requestOptions) => {
    const headers = new Headers(options.headers);
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    const response = await fetch(endpoint, {
      ...options,
      method: 'POST',
      headers,
      body: JSON.stringify(request),
      signal: requestOptions?.signal,
    });
    if (!response.ok) {
      throw new GraphQLClientError(
        `GraphQL HTTP request failed: ${response.status}`,
        [],
        response.status
      );
    }
    const result: unknown = await response.json();
    if (
      typeof result !== 'object' ||
      result === null ||
      Array.isArray(result)
    ) {
      throw new GraphQLClientError('Invalid GraphQL response');
    }
    return result as GraphQLResponse;
  };
}
