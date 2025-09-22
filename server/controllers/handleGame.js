const fs = require('fs')
const path = require('path')

const CURRENT_SEASON = 'SPRING 25'

function editGameAttendence(gameId, attendence, teamId) {

    const filePath = path.join(__dirname,'..', 'data.json')
        
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    for (let division of Object.values(data['seasons'][CURRENT_SEASON]['divisions'])) {
        for (let game of division['schedule']['schedule']) {
            if (game['id'] == gameId) {
                if (game['awayTeam'] == teamId) {
                    game['awayTeamAttendence'] = attendence
                } else {
                    game['homeTeamAttendence'] = attendence
                }
            }
        }
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')

}