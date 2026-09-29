import { ApiProvider } from '@workspace/client-ui/api';
import { electronTransport } from './apiTransport';
import { App } from '@workspace/client-ui';
import { ThemeProvider } from '@workspace/client-ui/components/ThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <HashRouter>
        <ApiProvider transport={electronTransport}>
          <App />
        </ApiProvider>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);
