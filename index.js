const DMX = require('dmx');
const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron/main');

const dev = '/dev/tty.usbserial-EN437503';
const dmx = new DMX();
const universe = dmx.addUniverse('dmx', 'enttec-usb-dmx-pro', dev);

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  universe.update({ 2: 0 });

  win.loadFile('index.html');
}

ipcMain.on('render', (_, val) => {
  console.log(val);
  universe.update({ 2: val });
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});