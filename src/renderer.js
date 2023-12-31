const ipcRenderer = electronAPI.ipcRenderer;

const resXbox = document.getElementById('resXBox')
const resYbox = document.getElementById('resYBox')
const renderApiSelect = document.getElementById('render-select')
const readonlyCheck = document.getElementById('readonly-check')
const confirmBtn = document.getElementById('confirmbtn')
const undoBtn = document.getElementById('undobtn')
const closeBtn = document.getElementById('closebtn')
const minimizeBtn = document.getElementById('minimizebtn')
const tooltip = document.getElementById('tooltip')
const readonlyContainer = document.getElementById('readonly-container')

async function updateValues() {
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

async function submitConfigChanges() {
    const data = {
        configData: {
            '/Script/FortniteGame': {
                'FortGameUserSettings': {
                    ResolutionSizeX: resXbox.value,
                    ResolutionSizeY: resYbox.value,
                    LastUserConfirmedResolutionSizeX: resXbox.value,
                    LastUserConfirmedResolutionSizeY: resYbox.value
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

confirmBtn.addEventListener('click', async () => {
    await submitConfigChanges()
})

undoBtn.addEventListener('click', async () => {
    await updateValues()
})

closeBtn.addEventListener('click', () => {
    ipcRenderer.send('close-window')
})

minimizeBtn.addEventListener('click', () => {
    ipcRenderer.send('minimize-window')
})

document.addEventListener('DOMContentLoaded', () => {
    updateValues();
});


//tooltips
confirmBtn.addEventListener('mouseenter', function () {
    tooltip.innerHTML = "Confirm your changes"
})

confirmBtn.addEventListener('mouseleave', function () {
    tooltip.innerHTML = ""
})

undoBtn.addEventListener('mouseenter', function () {
    tooltip.innerHTML = "Reset values back to current config"
})

undoBtn.addEventListener('mouseleave', function () {
    tooltip.innerHTML = ""
})
readonlyContainer.addEventListener('mouseenter', function () {
    tooltip.innerHTML = "Set config file to read only (settings will revert when you restart game)"
})

readonlyContainer.addEventListener('mouseleave', function () {
    tooltip.innerHTML = ""
})
