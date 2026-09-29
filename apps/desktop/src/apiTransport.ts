import {
  GraphQLClientError,
  type GraphQLTransport,
} from '@workspace/client-ui/api/graphql';

// AbortSignal cannot cross IPC. Request cancellation needs a separate protocol.
export const electronTransport: GraphQLTransport = async (request) => {
  const result = await window.api.graphql(request);
  if (!result.ok) {
    throw new GraphQLClientError(
      result.error.message,
      result.error.errors,
      result.error.status
    );
  }
  return result.response;
};
