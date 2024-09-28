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

  let isOn = false;

  setInterval(() => {
    const power = Number(isOn) * 10;

    universe.update({ 2: power });

    isOn = !isOn;
  }, 1000);

  win.loadFile('index.html');
}

ipcMain.on('click', (event, data) => {
  console.log(event, data);
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