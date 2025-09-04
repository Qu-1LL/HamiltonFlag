

const { User } = require('./user.js')

class Admin extends User {

    constructor(id, firstName, lastName, contactInfo = null) {
        super(id, firstName, lastName, 'Admin')
        this.contactInfo = contactInfo
    }

    getTeamId() {
        return this.teamId
    }

    getContactInfo() {
        return this.contactInfo
    }

}

module.exports = { Admin }