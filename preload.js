const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  render: (val) => ipcRenderer.send('render', val)
});