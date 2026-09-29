import {
  GraphQLClientError,
  type GraphQLRequest,
  type GraphQLTransport,
} from '@workspace/client-ui/api/graphql';
import type { GraphQLIpcResult } from '../shared/api';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseRequest(value: unknown): GraphQLRequest {
  if (
    !isRecord(value) ||
    typeof value.query !== 'string' ||
    !value.query.trim() ||
    (value.variables !== undefined && !isRecord(value.variables)) ||
    (value.operationName !== undefined &&
      typeof value.operationName !== 'string')
  ) {
    throw new Error('Invalid GraphQL IPC request');
  }
  // Only forward the supported fields; URLs and headers stay in main.
  return {
    query: value.query,
    variables: value.variables,
    operationName: value.operationName,
  };
}

export async function handleGraphQLRequest(
  transport: GraphQLTransport,
  request: unknown
): Promise<GraphQLIpcResult> {
  try {
    return { ok: true, response: await transport(parseRequest(request)) };
  } catch (error) {
    return {
      ok: false,
      error: {
        message:
          error instanceof Error ? error.message : 'GraphQL request failed',
        errors: error instanceof GraphQLClientError ? error.errors : [],
        status: error instanceof GraphQLClientError ? error.status : undefined,
      },
    };
  }
}
