import { app, BrowserWindow, ipcMain } from 'electron';
import { createHttpGraphQLTransport } from '@workspace/api';
import { GRAPHQL_CHANNEL } from '../shared/api';
import { handleGraphQLRequest } from './graphql';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..');

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  const transport = createHttpGraphQLTransport(
    process.env.CAD_DMS_GRAPHQL_URL ?? 'http://localhost:8080/graphql'
  );

  ipcMain.handle(GRAPHQL_CHANNEL, (event, request: unknown) => {
    const frame = event.senderFrame;
    const expectedUrl = VITE_DEV_SERVER_URL
      ? new URL(VITE_DEV_SERVER_URL)
      : pathToFileURL(path.join(RENDERER_DIST, 'index.html'));
    const actualUrl = frame ? new URL(frame.url) : null;
    // HashRouter changes the fragment, but the trusted document stays the same.
    expectedUrl.hash = '';
    if (actualUrl) actualUrl.hash = '';
    if (
      !win ||
      event.sender !== win.webContents ||
      frame !== win.webContents.mainFrame ||
      actualUrl?.href !== expectedUrl.href
    ) {
      throw new Error('Unauthorized GraphQL IPC sender');
    }
    return handleGraphQLRequest(transport, request);
  });

  createWindow();
});
