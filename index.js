const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const controller = require('./controller')

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
    ipcMain.handle('getResX', () => {
        const test = controller.getResX()
        console.log(test)
        return test
    })
    ipcMain.handle('getResY', () => controller.getResY())
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})