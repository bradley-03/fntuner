const fs = require('fs')
const ini = require('ini')
const winattr = require('winattr')

const config = ini.parse(fs.readFileSync('./GameUserSettings.ini', 'utf-8'))

// console.log(config['/Script/FortniteGame']['FortGameUserSettings'].ResolutionSizeX)
// console.log(config['/Script/FortniteGame']['FortGameUserSettings'].ResolutionSizeY)
// console.log(config['/Script/FortniteGame']['FortGameUserSettings'].LastUserConfirmedResolutionSizeX)
// console.log(config['/Script/FortniteGame']['FortGameUserSettings'].LastUserConfirmedResolutionSizeY)

// winattr.set('./GameUserSettings.ini', { readonly: true }, err => {
//     if (err == null) {
//         console.log('success');
//     }
// });

module.exports.getResX = function () {
    console.log(config['/Script/FortniteGame']['FortGameUserSettings'].ResolutionSizeX)
    return config['/Script/FortniteGame']['FortGameUserSettings'].ResolutionSizeX
}

module.exports.getResY = function () {
    return config['/Script/FortniteGame']['FortGameUserSettings'].ResolutionSizeY
}
