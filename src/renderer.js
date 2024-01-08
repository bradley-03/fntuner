const ipcRenderer = electronAPI.ipcRenderer;

// form elements
const resXbox = document.getElementById('resXBox')
const resYbox = document.getElementById('resYBox')
const renderApiSelect = document.getElementById('render-select')
const readonlyCheck = document.getElementById('readonly-check')

// buttons
const confirmBtn = document.getElementById('confirmbtn')
const undoBtn = document.getElementById('undobtn')
const closeBtn = document.getElementById('closebtn')
const minimizeBtn = document.getElementById('minimizebtn')
const presetsbtn = document.getElementById('presetsbtn')

// content
const tooltip = document.getElementById('tooltip')
const readonlyContainer = document.getElementById('readonly-container')
const mainContent = document.getElementById('mainContent')
const presetsContent = document.getElementById('presetsContent')
const errorMsg = document.getElementById('errormsg')
const successMsg = document.getElementById('successmsg')


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
        errorMsg.classList.remove('show')
        successMsg.classList.add('show')
        sleep(3000).then(() => {
            successMsg.classList.remove('show')
        })
    } catch (e) {
        mainContent.classList.add('shake')
        errorMsg.classList.add('show')
        successMsg.classList.remove('show')
        sleep(200).then(() => {
            mainContent.classList.remove('shake')
        })
        sleep(6000).then(() => {
            errorMsg.classList.remove('show')
        })
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

presetsbtn.addEventListener('click', () => {
    mainContent.classList.toggle('hidden')
    presetsContent.classList.toggle('hidden')
})

//set initial values
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
