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
        <App />
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message);
});
