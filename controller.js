const fs = require('fs')
const ini = require('ini')
const winattr = require('winattr')
const { dialog } = require('electron')
const os = require('os')
const path = require('path')

const defaultConfigPath = path.join(os.homedir(), 'AppData', 'Local', 'FortniteGame', 'Saved', 'Config', 'WindowsClient', 'GameUserSettings.ini')
const config = ini.parse(fs.readFileSync(defaultConfigPath, 'utf-8'))

module.exports.getResX = function () {
    return config['/Script/FortniteGame']['FortGameUserSettings'].ResolutionSizeX
}

module.exports.getResY = function () {
    return config['/Script/FortniteGame']['FortGameUserSettings'].ResolutionSizeY
}

module.exports.setResolution = function (evt, arg) {
    console.log("resolution change")
    console.log(evt)
    console.log(arg)
}

module.exports.setFilePath = async function () {
    const {canceled, filePaths} = await dialog.showOpenDialog({properties: ['openDirectory']})
    if (!canceled) {
        console.log(filePaths)
    }
}