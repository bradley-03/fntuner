const fs = require('fs')
const ini = require('ini')
const winattr = require('winattr')
const { dialog } = require('electron')
const os = require('os')
const path = require('path')

const configPath = './GameUserSettings.ini'
const config = ini.parse(fs.readFileSync(configPath, 'utf-8'))

module.exports.getResX = function () {
    return config['/Script/FortniteGame']['FortGameUserSettings'].ResolutionSizeX
}

module.exports.getResY = function () {
    return config['/Script/FortniteGame']['FortGameUserSettings'].ResolutionSizeY
}

module.exports.setResolution = function (evt, arg) {
}