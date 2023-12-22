const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setValues: () => ipcRenderer.invoke('setValues'),
    ipcRenderer: ipcRenderer,
})

