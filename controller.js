const fs = require('fs')
const ini = require('ini')
const winattr = require('winattr')
const path = require('path')
const config = require('./config.js')
const {dialog} = require('electron')

let cfgFile = ""

module.exports.openCfgFile = async function () {
    const configSettings = await config.getConfig()
    if (fs.existsSync(path.join(configSettings.filePath, "GameUserSettings.ini"))) {
        cfgFile = ini.parse(fs.readFileSync(path.join(configSettings.filePath, "GameUserSettings.ini"), 'utf-8'))
    } else {
        await dialog.showErrorBox("Invalid Directory!", "The current selected directory doesn't include 'GameUserSettings.ini' config file, please choose a new one.")
        await config.setFilePath()
    }
}
module.exports.setValues = async function () {
    const configSettings = await config.getConfig()
    const values = {
        ...configSettings,
        resolutionX: cfgFile['/Script/FortniteGame']['FortGameUserSettings'].ResolutionSizeX || 1920,
        resolutionY: cfgFile['/Script/FortniteGame']['FortGameUserSettings'].ResolutionSizeY || 1080,
    }

    return values
}