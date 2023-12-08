const filepathBtn = document.getElementById('filepath-btn')
const filepathBox = document.getElementById('filepath-box')
const resXBox = document.getElementById('resXBox')
const resYBox = document.getElementById('resYBox')
const renderSelect = document.getElementById('render-select')
const readOnlyCheck = document.getElementById('readonly-check')

async function setValues () {
    const values = await window.electronAPI.setValues()
    filepathBox.value = values.filePath
    resXBox.value = values.resolutionX
    resYBox.value = values.resolutionY
    renderSelect.value = values.renderApi
    readOnlyCheck.checked = values.readOnly
}
setValues()

filepathBtn.addEventListener('click', async () => {
    await window.electronAPI.setFilePath()
    setValues()
})