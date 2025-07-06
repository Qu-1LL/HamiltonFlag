
import { User } from './user.js'

export class Coach extends User {

    constructor(firstName, lastName, id, teamName, contactInfo) {
        this.teamName = teamName
        this.contactInfo = contactInfo
        super(firstName, lastName, id)
    }

    getTeamName() {
        return this.teamName
    }

    getContactInfo() {
        return this.contactInfo
    }

}