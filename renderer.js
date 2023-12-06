const button = document.getElementById('testbtn')

async function setInitialXY () {
    const x = await window.electron.resX()
    const y = await window.electron.resY()
    const box = document.getElementById('resXBox')
    const box2 = document.getElementById('resYBox')
    if (box) box.value = x
    if (box2) box2.value = y
}
setInitialXY()