import type {
  GraphQLRequest,
  GraphQLResponse,
  GraphQLResponseError,
} from '@workspace/client-ui/api/graphql';

export const GRAPHQL_CHANNEL = 'api:graphql';

export type GraphQLIpcResult =
  | { ok: true; response: GraphQLResponse }
  | {
      ok: false;
      error: {
        message: string;
        errors: readonly GraphQLResponseError[];
        status?: number;
      };
    };

export interface DesktopApi {
  graphql(request: GraphQLRequest): Promise<GraphQLIpcResult>;
}
