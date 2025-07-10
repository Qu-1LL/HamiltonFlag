
const { Player } = require('../models/player');
const { Coach } = require('../models/coach');
const { ContactInfo } = require('../models/contactInfo');
const { Team } = require('../models/team');

function xlsxToTeamsList(data) {
    let lineNum = 0

    //program name
    let program = Object.keys(data[0])[0]
    let division = Object.values(data[0])[0]

    let myTeams = []

    while (lineNum < data.length) {

        let teamName = undefined

        if (Object.values(data[lineNum])[0].startsWith("Team Name: ")) {
            teamName = Object.values(data[lineNum])[0].slice(11)
        }

        if (teamName === undefined) {
            lineNum++
            continue
        }

        lineNum += 3

        let players = []
        //each loop creates a new player
        while(Object.values(data[lineNum]).length > 1 ) {
            let info = Object.values(data[lineNum])
            players.push(new Player(info[1],info[4],info[0],info[2],info[3],teamName))
            lineNum++
        }

        lineNum += 3

        let personnel = []
        //each loop creates a new personnel
        while(Object.values(data[lineNum]).length > 1 ) {
            let info = Object.values(data[lineNum])
            personnel.push(new Coach(info[2],info[3],teamName, new ContactInfo(info[2]+" "+info[3],info[5],info[4])))
            lineNum++
        }

        myTeams.push(new Team(teamName,players,personnel))

    }

    return myTeams
}

module.exports = { xlsxToTeamsList }

/* 
User will upload xlsx file to react app
file will be sent here as buffer
use xlsx library to read and covnert to json
send json back to front end for visual approval and manual rearrangement if neccesary
once manually approved, sent back to server to be held as updated info for the current season.
*/