import App from '@/App';
import '@workspace/ui/globals.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message);
});
