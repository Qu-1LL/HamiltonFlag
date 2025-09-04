const fs = require('fs')
const path = require('path')

const CURRENT_SEASON = 'SPRING 25'

function getOfficialById(officialId) {

    const filePath = path.join(__dirname,'..', 'data.json')
    
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    for (let official of data['seasons'][CURRENT_SEASON]['officials']) {
        if (official['id'] === officialId ) {
            return official
        }
    }

    return null
}

function getGameById(gameId) {

    const filePath = path.join(__dirname,'..', 'data.json')
    
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    for (let division of Object.values(data['seasons'][CURRENT_SEASON]['divisions'])) {
        for (let game of division['schedule']['schedule']) {
            if (game['id'] === gameId ) {
                return game
            }
        }
    }

    return null
}

function getSchedule(myDivision=null) {

    const filePath = path.join(__dirname,'..', 'data.json')
    
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    let mySchedule = []

    if(myDivision === null) {
        for (let division of Object.values(data['seasons'][CURRENT_SEASON]['divisions'])) {
            for( let game of division['schedule']['schedule']) {
                mySchedule.push(game)
            }
        }
    } else {
        for (let game of data['seasons'][CURRENT_SEASON]['divisions'][myDivision]['schedule']['schedule']) {
            mySchedule.push(game)
        }
    }

    return mySchedule

}

function getPlayers(playerIds) {

    const filePath = path.join(__dirname,'..', 'data.json')
    
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    //returnes list of full player objects

}

function getOfficials() {

    const filePath = path.join(__dirname,'..', 'data.json')
    
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    return data['seasons'][CURRENT_SEASON]['officials']

}

function getTeamById(teamId) {

    const filePath = path.join(__dirname,'..', 'data.json')
    
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    for (let division of Object.values(data['seasons'][CURRENT_SEASON]['divisions'])) {
        for( let team of division['teams']) {
            if (team['id'] == teamId) {
                return team
            }
        }
    }

}

function getGames() {

    const filePath = path.join(__dirname,'..', 'data.json')
    
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    let myGames = []

    for (let division of Object.values(data['seasons'][CURRENT_SEASON]['divisions'])) {
        for( let game of division['schedule']['schedule']) {
            myGames.push(game)
        }
    }

    return myGames
}

module.exports = { getOfficialById, getGameById, getSchedule, getPlayers, getOfficials, getTeamById, getGames }