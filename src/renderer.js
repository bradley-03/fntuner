const resXBox = document.getElementById('resXBox')
const resYBox = document.getElementById('resYBox')
const renderSelect = document.getElementById('render-select')
const readOnlyCheck = document.getElementById('readonly-check')
const confirmButton = document.getElementById('confirmbtn')

async function setValues () {
    const values = await window.electronAPI.setValues()
    resXBox.value = values.resolutionX
    resYBox.value = values.resolutionY
    renderSelect.value = values.renderApi
    readOnlyCheck.checked = values.readOnly
}
// setValues()

confirmButton.addEventListener('click', async () => {
    const vals = {
        resolutionX: resXBox.value,
        resolutionY: resYBox.value,
        renderApi: renderSelect.value,
        readOnly: readOnlyCheck.checked,
    }
    window.electronAPI.ipcRenderer.send('updateConfig', vals)
})