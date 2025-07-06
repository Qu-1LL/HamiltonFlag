
import { User } from './user.js'

export class Player extends User {

    constructor(firstName, lastName, id, draftOrder, teamName = null, jerseyNumber = null) {
        this.teamName = teamName
        this.draftOrder = draftOrder
        this.jerseyNumber = jerseyNumber
        super(firstName, lastName, id)
    }

    getTeamName() {
        return this.teamName
    }

    getDraftOrder() {
        return this.draftOrder
    }

    getJerseyNumber() {
        return this.jerseyNumber
    }

}