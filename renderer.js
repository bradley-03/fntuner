const filepathBtn = document.getElementById('filepath-btn')
const filepathBox = document.getElementById('filepath-box')
const resXBox = document.getElementById('resXBox')
const resYBox = document.getElementById('resYBox')

async function setValues () {
    const values = await window.electronAPI.setValues()
    filepathBox.value = values.filePath
    resXBox.value = values.resolutionX
    resYBox.value = values.resolutionY
}
setValues()

filepathBtn.addEventListener('click', async () => {
    await window.electronAPI.setFilePath()
    setValues()
})