const ipcRenderer = electronAPI.ipcRenderer;

const resXbox = document.getElementById('resXBox')
const resYbox = document.getElementById('resYBox')
const renderApiSelect = document.getElementById('render-select')
const readonlyCheck = document.getElementById('readonly-check')
const submitBtn = document.getElementById('confirmbtn')
const undoBtn = document.getElementById('undobtn')

async function updateValues () {
    try {
        const data = await ipcRenderer.invoke('get-config')

        // update values with new data
        resXbox.value = data.resolutions.X
        resYbox.value = data.resolutions.Y 
        renderApiSelect.value = data.renderApi
        readonlyCheck.checked = data.readOnly
    } catch (e) {
        console.error("Error updating values in renderer process", e)
        return null
    }
}

async function submitConfigChanges () {
    const data = {
        configData: {
            '/Script/FortniteGame': {
                'FortGameUserSettings': {
                    ResolutionSizeX: resXbox.value,
                    ResolutionSizeY: resYbox.value
                }
            }
        },
        renderApi: renderApiSelect.value,
        readOnly: readonlyCheck.checked        
    } 
    
    try {
        const res = await ipcRenderer.invoke('write-config', data)
    } catch (e) {
        console.log(e)
    }
}

submitBtn.addEventListener('click', async () => {
    await submitConfigChanges()
})

undoBtn.addEventListener('click', async () => {
    await updateValues()
})

document.addEventListener('DOMContentLoaded', () => {
    updateValues();
});