
const { Player } = require('./player');
const { Coach } = require('./coach');
const { Lineup } = require('./lineup.js')

class Team {

    constructor(teamName, players, personnel, lineups = []) { 
        this.teamName = teamName
        this.players = players
        this.playerCount = players.length
        this.personnel = personnel
        this.personnelCount = personnel.length
        this.lineups = lineups
        this.lineups.push(new Lineup(this))
    }

    getTeamName() {
        return this.teamName
    }

    getPlayers() {
        return this.players
    }

    getPlayerCount() {
        return this.playerCount
    }

    getPersonnel() {
        return this.personnel
    }

    getPersonnelCount() {
        return this.personnelCount
    }

    addPersonnel(person) {
        //if player tries to add personnel who is already there, will prevent the list from holding duplicates
        this.removePersonnel(person)
        this.personnel.push(person)
        this.personnelCount = this.personnel.length
    }

    removePersonnel(person) {
        this.personnel = this.personnel.filter((p) => {
            p.name != person.name
        })
        this.personnelCount = this.personnel.length
    }

}

module.exports = { Team }