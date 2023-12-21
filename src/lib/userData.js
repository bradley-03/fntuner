const { dialog, app } = require('electron')
const settings = require('electron-settings')
const os = require('os')
const path = require('path')
const fs = require('fs').promises
const controller = require('./controller')

const dataPath = path.join(app.getPath('userData'), 'userData.json')

module.exports.createDataFile = async function () {
    const defaultData = JSON.stringify({
        filePath: path.join(os.homedir(), 'AppData', 'Local', 'FortniteGame', 'Saved', 'Config', 'WindowsClient'),
        presets: []
    }, null, 4)

    try {
        // Check for userData file
        await fs.access(dataPath, fs.constants.R_OK | fs.constants.W_OK)
    } catch (err) {
        // File doesn't exist, create and write default data
        try {
            await fs.writeFile(dataPath, defaultData)
            console.log("userData file created with default data.")
        } catch (writeErr) {
            console.error("Error writing userData file.", writeErr)
        }
    }
}

module.exports.writeDataFile = async function (newData) {
    try {
        const data = await fs.readFile(dataPath, 'utf-8')

        let existingData
        try {
            existingData = JSON.parse(data) // Parse existing data
        } catch (parseErr) {
            console.error("Error parsing existing data", parseErr)
            return
        }        

        // Merge old data with new data
        const updatedData = { ...existingData, ...newData }
        const parsedUpdatedData = JSON.stringify(updatedData, null, 4)

        // Write new data
        await fs.writeFile(dataPath, parsedUpdatedData)

        console.log("Updated userData.")
    } catch (err) {
        console.error("Error reading/writing userData file", err)
    }
}

module.exports.getUserData = async function (req) {
    try {
        const data = await fs.readFile(dataPath, 'utf-8')
        const parsedData = JSON.parse(data)

        if (parsedData[req]) {
            return parsedData[req]
        } else {
            console.error(`Can't find ${req} in userData`)
            throw new Error(errorMsg)
        }
    } catch (err) {
        console.error("Error:", err)
        throw new Error(err)
    }
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

