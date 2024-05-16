const DMX = require('dmx');
const { app, BrowserWindow } = require('electron/main');

const path = '/dev/tty.usbserial-EN437503';
const dmx = new DMX();
const universe = dmx.addUniverse('dmx', 'enttec-usb-dmx-pro', path);

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  });

  let isOn = false;

  setInterval(() => {
    const power = Number(isOn) * 100;

    universe.update({ 2: power });
    console.log(power);

    isOn = !isOn;
  }, 1000);

  win.loadFile('index.html');
}

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