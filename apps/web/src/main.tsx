import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@workspace/client-ui';
import { ThemeProvider } from '@workspace/client-ui/components/theme-provider';
import { BrowserRouter } from 'react-router';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
