
const { User } = require('./user.js')

class Coach extends User {

    constructor(firstName, lastName, teamName, contactInfo) {
        super(firstName, lastName)
        this.teamName = teamName
        this.contactInfo = contactInfo
    }

    getTeamName() {
        return this.teamName
    }

    getContactInfo() {
        return this.contactInfo
    }

}

module.exports = { Coach }