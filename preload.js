const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    resX: () => ipcRenderer.invoke('getResX'),
    resY: () => ipcRenderer.invoke('getResY'),
    setResolution: () => ipcRenderer.send('setResolution'),
})

