const { dialog, app } = require('electron')
const settings = require('electron-settings')
const os = require('os')
const path = require('path')
const fs = require('fs')
const controller = require('./controller')

const dataPath = path.join(app.getPath('userData'), 'userData.json')

console.log(dataPath)

module.exports.createDataFile = function () {
    const defaultData = JSON.stringify({
        filePath: path.join(os.homedir(), 'AppData', 'Local', 'FortniteGame', 'Saved', 'Config', 'WindowsClient'),
        presets: []
    }, null, 4)

    fs.access(dataPath, fs.constants.R_OK | fs.constants.W_OK, (err) => { // check for userData file
        if (!err) {
            console.log("Loading user data.")
        } else {
            fs.writeFile(dataPath, defaultData, (e) => { // write userData file
                if (e) { console.log("Error writing userData file.", e) }
            })
        }
    })
}

module.exports.writeDataFile = function (newData) {
    fs.readFile(dataPath, 'utf-8', (err, data) => {
        if (err) {
            console.error("Error reading userData file", err)
            return
        }

        // parse existing data
        let existingData;
        try {
            existingData = JSON.parse(data)
        } catch (parseErr) {
            console.error("Error parsing existing data", parseErr)
            return
        }

        const updatedData = {...existingData, ...newData} // merge old data with new data
        const parsedUpdatedData = JSON.stringify(updatedData, null, 4)

        // write new data
        fs.writeFile(dataPath, parsedUpdatedData, (writeErr) => {
            if (!writeErr) {
                console.log("Updated userData.")
            } else {
                console.error("Error writing to userData", writeErr)
            }
        })
    })
}

module.exports.createSettingsFile = function () {
    // console.log(dataPath)
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
    const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openDirectory'], defaultPath: await settings.get('settings.filePath') })
    if (!canceled) {
        if (fs.existsSync(path.join(filePaths[0], 'GameUserSettings.ini'))) {
            await settings.set('settings', { filePath: filePaths[0] })
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

