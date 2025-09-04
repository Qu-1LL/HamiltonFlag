
const { Player } = require('./player.js')

class Lineup {

    constructor(team) {
        this.name = 'new lineup'
        this.players = []
        this.orderDict = {}
        team.getPlayers().map((player) => {
            this.players.push(player.id)
            this.orderDict[player.id] = player.draftOrder
        })
        this.attendence = team.getPlayers().reduce((team, player) => {
            team[player.id] = true
            return team
        }, {})
        //creating lineups
        this.players.sort((a, b) => this.orderDict[a] - this.orderDict[b]);
        this.firstOffense = this.players.slice(0,5)
        this.firstDefense = this.players.slice(5,this.players.length)
        this.secondOffense = this.players.slice(5,this.players.length)
        this.secondDefense = this.players.slice(0,5)
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
        this.#remakeLineups() 
    }

    #remakeLineups() {
        //remake lineups based on missing players
        //write algorithm to pick 2 closest players based on draft order
    }

}

module.exports = { Lineup }