
const { Player } = require('../models/player');
const { Coach } = require('../models/coach');

class Team {

    constructor(teamName, players, personnel, lineups = []) { 
        this.teamName = teamName
        this.players = players
        this.playerCount = players.length
        this.personnel = personnel
        this.personnelCount = personnel.length
        this.lineups = lineups
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
            p.id != person.id
        })
        this.personnelCount = this.personnel.length
    }

}

module.exports = { Team }