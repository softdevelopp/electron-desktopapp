const { BrowserWindow, Notification } = require("electron");
const { getConnection } = require('./database');
const path = require('path');

const createUser = async (user) => {
    try {
      const conn = await getConnection();
      const result = await conn.query("INSERT INTO users SET ?", user);
      user.id = result.insertId;
  
      new Notification({
        title: "One Piece Movie Waiver",
        body: 'New user saved successfully'
      }).onshow()
      return user
    } catch (error) {
      console.log(error)
    }
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 700,
    height: 900,
    icon: __dirname + './assets/img/favicon.ico',
    webPreferences: {
      // preload: path.join(__dirname, 'ui/app.js'),
      nodeIntegration:true,
      contextIsolation:false,
      enableRemoteModule: true
    },
  });

  // and load the index.html of the app.
 mainWindow.loadFile(path.join(__dirname, 'ui/index.html'));
 mainWindow.setMenuBarVisibility(false);
  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
}

module.exports = {
  createUser,
  createWindow
};