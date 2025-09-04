const fs = require('fs')
const path = require('path')

const { addOfficialToGame, clearGameOfficials } = require('./handleSchedule.js')
const { getSchedule, getOfficials, getGames } = require('./handleGet.js')

const CURRENT_SEASON = 'SPRING 25'

function updateAvailability(officialId, availability) {

    const filePath = path.join(__dirname,'..', 'data.json')
        
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    for (let official of data['seasons'][CURRENT_SEASON]['officials']) {
        if (official['id'] === officialId ) {
            official['availability'] = availability
        }
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')

}

function setGameOfficials(weeksThursday) {

    let weeklyGames = getWeeklyGames(weeksThursday)

    for (let game of weeklyGames) {
        clearGameOfficials(game['id'])
    }

    weeklyGames = getWeeklyGames(weeksThursday)

    let officials = getOfficials()

    let officialsDict = {}
    for (let official of officials) {
        officialsDict[official['id']] = 0

    }

    for (let game of weeklyGames) {
        // console.log()
        // console.log("Game: ",game["startTime"])
        for( let i = 0; i < 3; i++) {
            let myOfficial = getLowestOfficial(officials, officialsDict, game['date'], Number(game.startTime.split(':')[0]), weeklyGames )
            if (myOfficial == null) {
                break
            }
            // console.log("Official: ",myOfficial["firstName"])
            addOfficialToGame(game['id'], myOfficial['id'])
            game['officials'].push(myOfficial['id'])
            officialsDict[myOfficial['id']]++
        }
    }

    return weeklyGames

}

function getWeeklyGames(thursday) {
    let weeklyGames = []

    let oneWeekMS = 7 * 24 * 60 * 60 * 1000

    let mySchedule = getGames()

    for(let game of mySchedule) {
        // let jsonString = JSON.parse(game['date'])
        let gameDate = new Date(game['date'])

        let myDiff = gameDate - thursday
        if (myDiff >= 0 && myDiff <= oneWeekMS) {
            weeklyGames.push(game)
            weeklyGames[weeklyGames.length - 1]['date'] = gameDate
        }
    }

    return weeklyGames
}

function getLowestOfficial(officials, officialsDict, date, time, games) {
    let lowestOfficial = null
    let lowestCount = Number.MAX_SAFE_INTEGER

    for (let official of officials) {
        if (date.getTime() in official['availability'] == false) {
            continue
        }
        if (officialIsntDoubleBooked(official, date, time, games) && official['availability'][date.getTime()][time] && officialsDict[official.id] < lowestCount) {
            lowestCount = officialsDict[official['id']]
            lowestOfficial = official
        }
    }
    return lowestOfficial
}

function officialIsntDoubleBooked(official, date, time, games) {
    for (let game of games) {
        if(game['date'].getTime() == date.getTime() && Number(game.startTime.split(':')[0]) == time) {
            let officialIds = game['officials']
            for (let id of officialIds) {
                if (id == official['id']) {
                    return false
                }
            }
        }
    }
    return true
}

module.exports = { updateAvailability, setGameOfficials, getWeeklyGames }