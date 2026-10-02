import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@workspace/client-ui';
import { ApiProvider } from '@workspace/api/react';
import { createHttpGraphQLTransport } from '@workspace/api';
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
