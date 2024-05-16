import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  sendValue: (value: number) => ipcRenderer.send('sendValue', value)
});
