const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const userData = require('./lib/userData.js')
const config = require('./lib/config.js')

const electron = require('electron')
require('electron-reload')('./app');

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
    
    ipcMain.handle('get-config', async () => (await config.getCurrentCfg())) // send current config as object

    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})