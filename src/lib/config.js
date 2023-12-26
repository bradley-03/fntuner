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
    
        // parse render api
        let renderApi
        if (iniData['D3DRHIPreference'].PreferredRHI == "dx11") {
            if (iniData['D3DRHIPreference'].PreferredFeatureLevel == "es31") {
                renderApi = "performance"
            } else {
                renderApi = "dx11"
            }
        } else {
            renderApi = "dx12"
        }

        // get resolution
        const resolutions = {
            X: iniData['/Script/FortniteGame']['FortGameUserSettings'].ResolutionSizeX,
            Y: iniData['/Script/FortniteGame']['FortGameUserSettings'].ResolutionSizeY,
        }

        // get file attributes (for read only)
        const fileAttrs = await winattr.getSync(cfgFilePath)

        return {
            renderApi,
            resolutions,
            readOnly: fileAttrs.readonly
        }
    } catch (e) {
        console.error("Config file not found.", e)
        return null
    }
}