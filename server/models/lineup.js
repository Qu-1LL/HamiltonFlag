
const { Player } = require('./player.js')

class Lineup {

    constructor(team) {
        this.name = 'new lineup'
        this.players = team.getPlayers()
        this.attendence = this.players.reduce((team, player) => {
            team[player.getDraftOrder()] = true
            //draft order will function as id for now
            return team
        }, {})
        //creating lineups
        this.#orderPlayersByDraft()
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

    #orderPlayersByDraft() {
        let myPlayers = []
        for (let i = 0; i < this.players.length; i++) {
            let topPlayer = 0
            for (let j = 0; j < this.players.length; i++) {
                if (this.players[j].getDraftOrder() < this.players[topPlayer].getDraftOrder()) {
                    topPlayer = this.players[j].getDraftOrder()
                }
            }
            myPlayers.push(this.players[topPlayer])
            this.players.splice(topPlayer, 1)
        }
        this.players = myPlayers
    }

    #remakeLineups() {
        //remake lineups based on missing players
        //write algorithm to pick 2 closest players based on draft order
    }

}

module.exports = { Lineup }