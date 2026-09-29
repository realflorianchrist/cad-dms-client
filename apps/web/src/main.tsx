import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@workspace/client-ui';
import {
  ApiProvider,
  createHttpGraphQLTransport,
} from '@workspace/client-ui/api';
import { ThemeProvider } from '@workspace/client-ui/components/ThemeProvider';
import { BrowserRouter } from 'react-router';
import './styles.css';

const transport = createHttpGraphQLTransport('http://localhost:8080/graphql');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <ApiProvider transport={transport}>
          <App />
        </ApiProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
