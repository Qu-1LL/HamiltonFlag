
const { User } = require('./user.js')

class Official extends User {

    constructor(firstName, lastName, contactInfo) {
        super(firstName, lastName)
        this.contactInfo = contactInfo
    }

    getContactInfo() {
        return this.contactInfo
    }

}

module.exports = { Official }