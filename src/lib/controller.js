const fs = require('fs').promises
const ini = require('ini')
const winattr = require('winattr')
const path = require('path')
const userData = require('./userData.js')
const { dialog } = require('electron')

let cfgFile = undefined
let cfgPath = ""

const renderAPIs = {
    performance: { PreferredRHI: "dx11", PreferredFeatureLevel: "es31" },
    dx11: { PreferredRHI: "dx11", PreferredFeatureLevel: "sm5" },
    dx12: { PreferredRHI: "dx12", PreferredFeatureLevel: "sm6" },
}

module.exports.updateFilePath = async function () {
    const currentPath = await userData.getUserData('filePath')
    const { canceled, filePaths } = await dialog.showOpenDialog({ 
            properties: ['openDirectory'], 
            defaultPath: currentPath
    }) // open folder picker

    if (!canceled) {    
        try {
            await fs.access( path.join(filePaths[0], 'GameUserSettings.ini'), fs.constants.R_OK )
            await userData.updateUserData({filePath: filePaths[0]})
            console.log("Successfully updated filePath.")
        } catch (err) {
            await dialog.showErrorBox("Invalid Directory.", "The directory you selected doesn't include a 'GameUserSettings.ini' file, the app won't work without this.")
        }
    }
}








// module.exports.openCfgFile = async function () {
//     const configSettings = await config.getConfig()
//     if (fs.existsSync(path.join(configSettings.filePath, "GameUserSettings.ini"))) {
//         cfgFile = ini.parse(fs.readFileSync(path.join(configSettings.filePath, "GameUserSettings.ini"), 'utf-8'))
//         cfgPath = path.join(configSettings.filePath)
//     } else {
//         await dialog.showErrorBox("Invalid Directory!", "The current selected directory doesn't include 'GameUserSettings.ini' config file, please choose a new one.")
//         // await config.setFilePath()
//     }
// }

// module.exports.setValues = async function () {
//     const configSettings = await config.getConfig()

//     let renderApi = "dx12"
//     if (cfgFile && cfgFile['D3DRHIPreference'].PreferredRHI == "dx11") {
//         if (cfgFile['D3DRHIPreference'].PreferredFeatureLevel == "es31") {
//             renderApi = "performance"
//         } else {
//             renderApi = "dx11"
//         }
//     } else {
//         renderApi = "dx12"
//     }

//     let resolutions = {}
//     if (cfgFile) {
//         resolutions.X = cfgFile['/Script/FortniteGame']['FortGameUserSettings'].ResolutionSizeX
//         resolutions.Y = cfgFile['/Script/FortniteGame']['FortGameUserSettings'].ResolutionSizeY
//     }

//     const values = {
//         ...configSettings,
//         resolutionX: resolutions.X || 1920,
//         resolutionY: resolutions.Y || 1080,
//         renderApi,
//         readOnly: winattr.getSync(path.join(cfgPath, 'GameUserSettings.ini'))["readonly"] || false,
//     }

//     return values
// }

// module.exports.updateConfig = async function (vals) {
//     if (cfgFile === undefined) {
//         await dialog.showErrorBox("Invalid Directory!", "Could not confirm changes as 'GameUserSettings.ini' file was not found in the current directory.")
//         return
//     }

//     // remove readonly for editing
//     try {
//         await winattr.setSync(path.join(cfgPath, 'GameUserSettings.ini'), { readonly: false })
//     } catch {
//         dialog.showErrorBox("Oh No!", "Something went wrong whilst changing the Read-Only property of your config.")
//     }

//     // create backup
//     if (!fs.existsSync(path.join(cfgPath, 'GameUserSettings_BAK.ini'))) {
//         fs.copyFile(path.join(cfgPath, 'GameUserSettings.ini'), path.join(cfgPath, 'GameUserSettings_BAK.ini'), (err) => {
//             if (err) {
//                 console.log(err)
//                 dialog.showErrorBox("Oh No!", "Something went wrong when trying to backup your config file.")
//             }
//         })
//     }

//     // resolution values
//     cfgFile['/Script/FortniteGame']['FortGameUserSettings'].ResolutionSizeX = vals.resolutionX
//     cfgFile['/Script/FortniteGame']['FortGameUserSettings'].ResolutionSizeY = vals.resolutionY
//     cfgFile['/Script/FortniteGame']['FortGameUserSettings'].LastUserConfirmedResolutionSizeX = vals.resolutionX
//     cfgFile['/Script/FortniteGame']['FortGameUserSettings'].LastUserConfirmedResolutionSizeY = vals.resolutionY

//     // rendering api
//     cfgFile['D3DRHIPreference'].PreferredRHI = renderAPIs[vals.renderApi].PreferredRHI
//     cfgFile['D3DRHIPreference'].PreferredFeatureLevel = renderAPIs[vals.renderApi].PreferredFeatureLevel

//     fs.writeFile(path.join(cfgPath, 'GameUserSettings.ini'), ini.stringify(cfgFile), (err) => {
//         if (!err) {
//             dialog.showMessageBox(null, {title: "Success", message: "Successfully updated your config!"})
//         }
//     })

//     if (vals.readOnly === true) {
//         try {
//             await winattr.setSync(path.join(cfgPath, 'GameUserSettings.ini'), { readonly: true })
//         } catch {
//             dialog.showErrorBox("Oh No!", "Something went wrong whilst changing the Read-Only property of your config.")
//         }
//     }
// }