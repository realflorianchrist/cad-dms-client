# GraphQL with TanStack Query

The hooks accept generated `TypedDocumentNode` documents. Variables and result
fields are inferred automatically; required query variables must be provided.
TanStack Query still owns caching, retries, loading states and invalidation.

## Package entry points

- `@workspace/api`: transport, execution, errors and shared request/response types; no React imports.
- `@workspace/api/react`: provider, query/mutation hooks and directory/document hooks.
- `@workspace/api/generated`: generated GraphQL types and operation documents.

Apps own endpoints, authentication and Electron IPC. This package does not depend on UI packages.

## Schema and generation

`schema.graphqls` is a checked-in copy of
`cad-dms/src/main/resources/graphql/schema.graphqls` from the sibling backend.
It is not automatically synchronized. Replace the copy when the backend schema
changes, then regenerate. No backend server is needed for generation or IntelliSense.

From the repository root:

```sh
pnpm --filter @workspace/api codegen
pnpm --filter @workspace/api codegen:watch
```

Write operations in `src/operations/*.graphql`. Codegen validates them against
the schema and writes `src/generated/`. Commit generated files; do not edit
them manually. The current schema has queries only, so no create-directory mutation
can be generated yet.

`DateTime` and `Long` currently map to `unknown`: the schema alone does not define
their JSON representation. Once the backend serialization is confirmed, configure
scalar mappings in `codegen.ts`. Type mappings do not convert runtime values.

The root `graphql.config.yml` configures the editor separately. Install the
recommended GraphQL VS Code extensions for field/argument completion and validation
inside `.graphql` files. Both editor and codegen use the same schema snapshot.

## Shared hooks

```tsx
import { useApiQuery } from '@workspace/api/react';
import {
  DirectoryDocument,
  DirectoriesDocument,
} from '@workspace/api/generated';

const directories = useApiQuery(DirectoriesDocument, {
  queryKey: ['directories'],
  queryOptions: { select: (data) => data.directories },
});
// directories.data: array of { directoryId, name, archived } | undefined

const directory = useApiQuery(DirectoryDocument, {
  queryKey: ['directory'],
  variables: { directoryId: 'example-id' },
});
// directory.data?.directory can be null if the directory does not exist.
```

`useApiMutation` also accepts a generated document. Once the backend supplies
mutations, pass `invalidateKeys: [['directories']]` to refresh matching queries after
success. Custom `mutationOptions.onSuccess` and invalidation are both awaited.
For an operation without variables, call `mutate({})`.

Keys automatically include the printed document, operation name and variables.
Use a prefix such as `['directories']` for invalidation; `apiQueryKey` accepts the
same document to build a full key for exact cache access.

## App-specific transport

Configure one stable transport at the app entry point. `ApiProvider` provides both
this transport and a TanStack QueryClient (an existing `queryClient` can be passed).
The backend URL, authentication and Electron IPC handler remain app-owned.

```tsx
import { ApiProvider } from '@workspace/api/react';
import { createHttpGraphQLTransport } from '@workspace/api';

const transport = createHttpGraphQLTransport('/graphql');

<ApiProvider transport={transport}>
  <App />
</ApiProvider>;
```

For Electron, pass an adapter to a dedicated preload method:

```ts
import type { GraphQLTransport } from '@workspace/api';

const transport: GraphQLTransport = (request) => window.api.graphql(request);
```

This is an integration example: `window.api.graphql` must be implemented and typed
in the desktop app. Hooks print documents to GraphQL strings before invoking the
transport, so IPC still receives a serializable request. Return the GraphQL envelope
(`data`, `errors`) from main. Validate IPC requests there and keep the endpoint fixed.
Do not send AbortSignal through IPC; cancellation requires a separate IPC protocol.
HTTP transports support cancellation directly. Main can import the HTTP helper
from `@workspace/api` without importing React.

Hooks return only envelope `data`. GraphQL errors, including partial-data responses,
reject with `GraphQLClientError`. Extensions and paths are preserved in `.errors`;
HTTP failures expose `.status`. Network errors remain ordinary Errors. Clear the
cache when switching users/backends.

## Directory hooks

`hooks/useDirectories.ts` and `hooks/useDirectory.ts` wrap the example operations and
select their root fields, so components receive the list or directory directly:

```tsx
import { useDirectory, useDirectories } from '@workspace/api/react';

const { data: directories, isPending } = useDirectories();
const { data: directory } = useDirectory('example-id');
```

Use these inside `ApiProvider`. `directory` is `undefined` before data is available
and can be `null` when the backend finds no matching directory. The ID is included
in the cache key automatically through the operation variables.

## Documents

Documents are queried through their containing directory. useDocument(directoryId, documentId) shares the directory query cache and returns the selected document, or null when it is absent. Names and extensions belong to currentVersion. Directory tree contents load on expansion.
