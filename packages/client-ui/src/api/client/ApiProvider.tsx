import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { ApiContext } from './context';
import type { GraphQLTransport } from './graphql';

export function ApiProvider({
  transport,
  queryClient,
  children,
}: Readonly<{
  transport: GraphQLTransport;
  queryClient?: QueryClient;
  children: ReactNode;
}>) {
  const [defaultQueryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient ?? defaultQueryClient}>
      <ApiContext.Provider value={transport}>{children}</ApiContext.Provider>
    </QueryClientProvider>
  );
}
