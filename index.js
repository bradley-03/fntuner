const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const controller = require('./controller')
const config = require('./config')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile(path.join(__dirname, 'src', 'index.html'))
}

app.whenReady().then(() => {
    config.createConfig() // create cfg file if none exists
    controller.openCfgFile()
    ipcMain.handle('setFilePath', config.setFilePath)
    ipcMain.handle('getInitValues', controller.getInitValues)

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})