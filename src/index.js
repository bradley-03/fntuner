const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const userData = require('./lib/userData.js')
const config = require('./lib/config.js')

// const electron = require('electron')
// require('electron-reload')('./');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 400,
        height: 500,
        minWidth: 400,
        minHeight: 500,
        maxWidth: 400,
        maxHeight: 500,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            devTools: false,
        },
        icon: path.join('./', 'src', 'img', 'icon.png')
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