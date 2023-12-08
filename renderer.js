const filepathBtn = document.getElementById('filepath-btn')
const filepathBox = document.getElementById('filepath-box')
const resXBox = document.getElementById('resXBox')
const resYBox = document.getElementById('resYBox')

async function setInitialValues () {
    const initValues = await window.electronAPI.getInitValues()
    filepathBox.value = initValues.filePath
    resXBox.value = initValues.resolutionX
    resYBox.value = initValues.resolutionY
}
setInitialValues()

filepathBtn.addEventListener('click', async () => {
    const newPath = await window.electronAPI.setFilePath()
    filepathBox.value = newPath
})