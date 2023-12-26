const ipcRenderer = electronAPI.ipcRenderer;

const resXbox = document.getElementById('resXBox')
const resYbox = document.getElementById('resYBox')
const renderApiSelect = document.getElementById('render-select')
const readonlyCheck = document.getElementById('readonly-check')

async function updateValues () {
    try {
        const data = await ipcRenderer.invoke('get-config')

        // resolutions
        resXbox.value = data.resolutions.X
        resYbox.value = data.resolutions.Y 

        // render api
        renderApiSelect.value = data.renderApi

        // readonly
        readonlyCheck.checked = data.readOnly

    } catch (e) {
        console.error("Error updating values in renderer process", e)
        return null
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateValues();
});