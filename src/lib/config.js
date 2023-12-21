const {dialog, app} = require('electron')
const settings = require('electron-settings')
const os = require('os')
const path = require('path')
const fs = require('fs')
const controller = require('./controller')

module.exports.createSettingsFile = function () {
    // console.log(app.getPath('userData'))
    try {
        if (!settings.hasSync("settings") && !settings.hasSync("configs")) {
            const defaultSettings = {
                filePath: path.join(os.homedir(), 'AppData', 'Local', 'FortniteGame', 'Saved', 'Config', 'WindowsClient'),
            }
            settings.setSync('settings', defaultSettings)
            settings.setSync('configs', {})
        }
    } catch (e) {
        console.log("Settings File Creation Failed")
    }
}

module.exports.setFilePath = async function () {
    const {canceled, filePaths} = await dialog.showOpenDialog({properties: ['openDirectory'], defaultPath: await settings.get('settings.filePath')})
    if (!canceled) {
        if (fs.existsSync(path.join(filePaths[0], 'GameUserSettings.ini'))) {
            await settings.set('settings', {filePath: filePaths[0]})
            await controller.openCfgFile()
            return filePaths
        }
        await dialog.showErrorBox("Invalid Directory!", "The directory you selected doesn't include a 'GameUserSettings.ini' config file.")
        return settings.getSync('settings.filePath')
    }
    return settings.getSync('settings.filePath')
}

module.exports.getConfig = async function () {
    const output = await settings.get("settings")
    return output
}

