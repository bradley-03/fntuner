const {dialog} = require('electron')
const config = require('electron-settings')
const os = require('os')
const path = require('path')
const fs = require('fs')
const controller = require('./controller')

module.exports.createConfig = function () {
    if (!config.hasSync("settings")) {
        const defaultSettings = {
            filePath: path.join(os.homedir(), 'AppData', 'Local', 'FortniteGame', 'Saved', 'Config', 'WindowsClient')
        }
        config.setSync('settings', defaultSettings)
    }
}

module.exports.setFilePath = async function () {
    const {canceled, filePaths} = await dialog.showOpenDialog({properties: ['openDirectory']})
    if (!canceled) {
        if (fs.existsSync(path.join(filePaths[0], 'GameUserSettings.ini'))) {
            await config.set('settings', {filePath: filePaths[0]})
            await controller.openCfgFile()
            return filePaths
        }
        await dialog.showErrorBox("Invalid Directory!", "The directory you selected doesn't include a 'GameUserSettings.ini' config file.")
        return config.getSync('settings.filePath')
    }
    return config.getSync('settings.filePath')
}

module.exports.getConfig = async function () {
    const output = await config.get("settings")
    return output
}

