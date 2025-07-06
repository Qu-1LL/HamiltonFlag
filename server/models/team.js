
import { Coach } from './coach.js'
import { Player } from './player.js'

export class Team {

    constructor(teamName, players, personnel) { 
        this.teamName = teamName
        this.players = players
        this.playerCount = players.length
        this.personnel = personnel
        this.personnelCount = personnel.length
    
        // if there are saved lineup preferences, that data should be stored here
        // create a lineup object though
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