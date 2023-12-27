const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const userData = require('./lib/userData.js')
const config = require('./lib/config.js')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 500,
        height: 600,
        minHeight: 500,
        minWidth: 400,
        maxWidth: 500,
        maxHeight: 600,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile(path.join('./', 'app', 'index.html'))

    ipcMain.on('minimize-window', () => {
        win.minimize()
    })
}

app.whenReady().then(async () => {
    await userData.createDataFile() // init userData file
    
    ipcMain.handle('get-config', async () => (await config.getCurrentCfg())) // send current config as object
    ipcMain.handle('write-config', async (event, data) => (await config.writeConfig(data))) // write new config data

    ipcMain.on('close-window', () => {
        app.quit()
    })


    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})