

const electron = require('electron')

// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain
const path = require('path')
const url = require('url')
const ffmpeg= require('fluent-ffmpeg');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
 //mainWindow.loadURL('file://${__dirname}/index.html');
//mainWindow.webContents.openDevTools();

mainWindow.on('closed', () => {
    mainWindow = null;
  });

  
}


app.on('ready', createWindow);

ipcMain.on('video:submit',(event, path )=>{
  
console.log('video',path);
mainWindow.webContents.send('video:metadata',path);
console.log('video demo',path);

  // ffmpeg.ffprobe(path,(err, metadata )=>{
  //   debugger;
  //    console.log('path: ',metadata);
  // });

});

