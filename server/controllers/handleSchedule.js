const fs = require('fs')
const path = require('path')

const CURRENT_SEASON = 'SPRING 25'

function removeOfficialFromGame(gameId, officialId) {

    const filePath = path.join(__dirname,'..', 'data.json')
            
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    for (let division of Object.values(data['seasons'][CURRENT_SEASON]['divisions'])) {
        for (let game of division['schedule']['schedule']) {
            if (game['id'] === gameId ) {
                let index = game['officials'].indexOf(officialId)
                if (index !== -1) {
                    game['officials'].splice(index, 1)
                }
            }
        }
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')

}

function addOfficialToGame(gameId, officialId) {

    const filePath = path.join(__dirname,'..', 'data.json')
            
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'))


    for (let division of Object.values(data['seasons'][CURRENT_SEASON]['divisions'])) {
        for (let game of division['schedule']['schedule']) {
            if (game['id'] == gameId ) {
                if (!game['officials'].includes(officialId)) {
                    game['officials'].push(officialId)                }
            }
        }
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')

}

function clearGameOfficials(gameId) {

    const filePath = path.join(__dirname,'..', 'data.json')
            
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    for (let division of Object.values(data['seasons'][CURRENT_SEASON]['divisions'])) {
        for (let game of division['schedule']['schedule']) {
            if (game['id'] == gameId ) {
                game['officials'] = []
            }
        }
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')

}

module.exports = { removeOfficialFromGame, addOfficialToGame, clearGameOfficials }