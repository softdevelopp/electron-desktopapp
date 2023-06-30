const { app, BrowserWindow} = require('electron');
const { createWindow } = require('./main');

require('./database');

require('electron-reload')(__dirname);

app.allowRendererProcessReuse = true;

if (require('electron-squirrel-startup')) {
  app.quit();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

