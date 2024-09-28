const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  click: (evt) => ipcRenderer.send('click', evt)
});