const button = document.getElementById('testbtn')

button.addEventListener('click', async () => {
    await window.electron.ping()
})