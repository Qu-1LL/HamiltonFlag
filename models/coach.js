
const { User } = require('./user.js')

class Coach extends User {

    constructor(id, firstName, lastName, teamId, contactInfo) {
        super(id, firstName, lastName, 'Coach')
        this.teamId = teamId
        this.contactInfo = contactInfo
    }

    getTeamId() {
        return this.teamId
    }

    getContactInfo() {
        return this.contactInfo
    }

}

module.exports = { Coach }