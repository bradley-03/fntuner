const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setFilePath: () => ipcRenderer.invoke('setFilePath'),
    getInitValues: () => ipcRenderer.invoke('getInitValues')
})

