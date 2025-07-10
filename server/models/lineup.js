
const { Player } = require('./player.js')

class Lineup {

    constructor(team) {
        this.name = 'new lineup'
        this.players = team.getPlayers()
        this.attendence = this.players.reduce((team, player) => {
            team[player.id] = false
            return team
        }, {})
        this.firstOffense = []
        this.firstDefense = []
        this.secondOffense = []
        this.secondDefense = []

    }

    getName() {
        return this.name
    }

    steName(name) {
        this.name = name
    }

    getPlayers() {
        return this.players
    }

    getAttendence() {
        return this.attendence
    }

    setAttendence(attendence) {
        this.attendence = attendence
    }

    #orderPlayersByDraft() {
        var myPlayers = []
        for (let i = 0; i < this.players.length; i++) {
            var topOrderIndex = {
                getDraftOrder(){
                    return Number.MAX_SAFE_INTEGER
                }
            }
            for (let j = 0; j < this.players.length; i++) {
                if (this.players[j].getDraftOrder() < topOrder) {
                    topOrder = this.players[j].getDraftOrder()
                }
            }
        }
    }

}

module.exports = { Lineup }