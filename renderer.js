async function setInitialValues () {

}
setInitialValues()

const filepathBtn = document.getElementById('filepath-btn')
const filepathBox = document.getElementById('filepath-box')

filepathBtn.addEventListener('click', async () => {
    const newPath = await window.electronAPI.setFilePath()
    filepathBox.value = newPath
})