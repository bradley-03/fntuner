const fs = require('fs')
const ini = require('ini')
const winattr = require('winattr')
const os = require('os')
const path = require('path')
const config = require('./config.js')

// const configPath = './GameUserSettings.ini'
// const config = ini.parse(fs.readFileSync(configPath, 'utf-8'))



// module.exports.getResX = function () {
//     return config['/Script/FortniteGame']['FortGameUserSettings'].ResolutionSizeX
// }

// module.exports.getResY = function () {
//     return config['/Script/FortniteGame']['FortGameUserSettings'].ResolutionSizeY
// }

module.exports.getInitValues = async function () {
    const configSettings = await config.getConfig()
    const values = {...configSettings}

    return values
}

module.exports.setResolution = function (evt, arg) {
}