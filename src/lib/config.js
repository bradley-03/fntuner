const fs = require('fs').promises
const path = require('path')
const os = require('os')
const ini = require('ini')
const winattr = require('winattr')

const cfgFilePath = path.join(os.homedir(), 'AppData', 'Local', 'FortniteGame', 'Saved', 'Config', 'WindowsClient', 'GameUserSettings.ini')
const renderAPIs = {
    performance: { PreferredRHI: "dx11", PreferredFeatureLevel: "es31" },
    dx11: { PreferredRHI: "dx11", PreferredFeatureLevel: "sm5" },
    dx12: { PreferredRHI: "dx12", PreferredFeatureLevel: "sm6" },
}

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

module.exports.writeConfig = async function (newData) {
    try {
        const originalData = await fs.readFile(cfgFilePath, 'utf-8')
        const iniData = ini.parse(originalData)

        // Merge old data with new data
        const updatedData = { ...iniData }
        if (newData['configData']['/Script/FortniteGame'].FortGameUserSettings) {
            updatedData['/Script/FortniteGame'].FortGameUserSettings = {...iniData['/Script/FortniteGame'].FortGameUserSettings, ...newData['configData']['/Script/FortniteGame'].FortGameUserSettings}
        }

        // render api
        updatedData['D3DRHIPreference'].PreferredRHI = renderAPIs[newData.renderApi].PreferredRHI
        updatedData['D3DRHIPreference'].PreferredFeatureLevel = renderAPIs[newData.renderApi].PreferredFeatureLevel

        // disable readonly so we can write
        await winattr.setSync(cfgFilePath, {readonly: false})

        await fs.writeFile(cfgFilePath, ini.stringify(updatedData))

        // set readonly based on checkbox
        await winattr.setSync(cfgFilePath, {readonly: newData['readOnly']})

        return 'success'
    } catch (err) {
        console.error("Error writing to config.", err)
        throw err
    }
}