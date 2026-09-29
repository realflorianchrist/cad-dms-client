import { ipcRenderer, contextBridge } from 'electron';
import { GRAPHQL_CHANNEL, type DesktopApi } from '../shared/api';

const api: DesktopApi = {
  graphql: (request) => ipcRenderer.invoke(GRAPHQL_CHANNEL, request),
};

contextBridge.exposeInMainWorld('api', api);
