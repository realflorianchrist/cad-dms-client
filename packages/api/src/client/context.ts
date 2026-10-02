import { createContext, useContext } from 'react';
import type { GraphQLTransport } from './graphql';

export const ApiContext = createContext<GraphQLTransport | null>(null);

export function useApiTransport() {
  const transport = useContext(ApiContext);
  if (!transport) {
    throw new Error('API hooks must be used inside ApiProvider');
  }
  return transport;
}
