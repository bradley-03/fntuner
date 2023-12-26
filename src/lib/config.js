const fs = require('fs').promises
const path = require('path')
const os = require('os')
const ini = require('ini')
const winattr = require('winattr')
const userData = require('./userData.js')

const cfgFilePath = path.join(os.homedir(), 'AppData', 'Local', 'FortniteGame', 'Saved', 'Config', 'WindowsClient', 'GameUserSettings.ini')

module.exports.getCurrentCfg = async function () {
    try {
        const originalData = await fs.readFile(cfgFilePath, 'utf-8')
        const iniData = ini.parse(originalData) // parse to object

        return iniData
    } catch (e) {
        console.error("Config file not found.", e)
        return null
    }
}