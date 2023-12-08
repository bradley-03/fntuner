const {dialog} = require('electron')
const config = require('electron-settings')
const os = require('os')
const path = require('path')

module.exports.createConfig = function () {
    if (!config.hasSync("settings")) {
        const defaultSettings = {
            filePath: path.join(os.homedir(), 'AppData', 'Local', 'FortniteGame', 'Saved', 'Config', 'WindowsClient')
        }
        config.setSync('settings', defaultSettings)
    }
}

module.exports.initConfig = function () {
    
}

module.exports.setFilePath = async function () {
    const {canceled, filePaths} = await dialog.showOpenDialog({properties: ['openDirectory']})
    if (!canceled) {
        await config.set('settings', {filePath: filePaths[0]})
        return filePaths
    }
    return config.getSync('settings.filePath')
}


