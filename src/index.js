const { app, BrowserWindow, ipcMain } = require('electron')

const electron = require('electron')
// Enable live reload for all the files inside your project directory
require('electron-reload')(__dirname);

const path = require('path')
const controller = require('./lib/controller.js')
const userData = require('./lib/userData.js')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile(path.join('./', 'app', 'index.html'))
}

app.whenReady().then(async () => {
    await userData.createDataFile() // init userData file

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})