# Shared GraphQL hooks

Configure one stable transport at the app entry point. `ApiProvider` provides both
this transport and a TanStack QueryClient (an existing queryClient can be passed).
The backend URL, schema, authentication and Electron IPC handler remain app-owned.

```tsx
import {
  ApiProvider,
  createHttpGraphQLTransport,
} from '@workspace/client-ui/api';

const transport = createHttpGraphQLTransport('/graphql');

<ApiProvider transport={transport}>
  <App />
</ApiProvider>;
```

For Electron, pass an adapter to a dedicated preload method instead:

```ts
import type { GraphQLTransport } from '@workspace/client-ui/api';

const transport: GraphQLTransport = (request) => window.api.graphql(request);
```

This is an integration example: `window.api.graphql` must be implemented and typed
in the desktop app. Return the serializable GraphQL envelope (`data`, `errors`)
from the main process. Validate IPC requests there and keep the endpoint fixed in
the main process. Do not send the transport's AbortSignal through IPC; cancellation
requires a separate IPC protocol. HTTP transports support cancellation directly.
The main process can import the HTTP helper from `@workspace/client-ui/api/graphql`
without importing React.

```tsx
import { useApiMutation, useApiQuery } from '@workspace/client-ui/api';

// Example schema; replace fields and input types with the backend's schema.
const projects = useApiQuery<
  { projects: { id: string; name: string }[] },
  { search: string }
>(
  `query Projects($search: String!) {
    projects(search: $search) { id name }
  }`,
  { queryKey: ['projects'], variables: { search: '' } }
);

const createProject = useApiMutation<
  { createProject: { id: string } },
  { name: string }
>(
  `mutation CreateProject($name: String!) {
    createProject(name: $name) { id }
  }`,
  {
    invalidateKeys: [['projects']],
    mutationOptions: {
      onSuccess: (data) => console.log(data.createProject.id),
    },
  }
);

createProject.mutate({ name: 'New project' });
```

Keys automatically include the document, operation name and variables. Use a
prefix such as `['projects']` for invalidation; `apiQueryKey` builds the full key
for exact cache access. `queryOptions.select` can transform the result (third
query generic). Invalidation and custom success callbacks are both awaited.

The transport returns an envelope; hooks return only its `data`. GraphQL errors,
including responses with partial data, reject with `GraphQLClientError`. Error
extensions and paths are preserved in `.errors`; HTTP failures expose `.status`.
Network errors remain ordinary Errors. Configure retries using queryOptions or
the QueryClient as appropriate. Clear the cache when switching users/backends.
