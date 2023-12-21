const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setFilePath: () => ipcRenderer.invoke('setFilePath'),
    setValues: () => ipcRenderer.invoke('setValues'),
    ipcRenderer: ipcRenderer,
})

