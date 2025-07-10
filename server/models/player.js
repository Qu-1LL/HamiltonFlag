
const { User } = require('./user.js')

class Player extends User {

    constructor(firstName, lastName, draftOrder, accountFirstName, accountLastName, teamName = null, jerseyNumber = null) {
        super(firstName, lastName)
        this.teamName = teamName
        this.draftOrder = draftOrder
        this.jerseyNumber = jerseyNumber
        this.accountFirstName = accountFirstName
        this.accountLastName = accountLastName
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

    getAccountFirstName() {
        return this.accountFirstName
    }

    getAccountLastName() {
        return this.accountLastName
    }

}

module.exports = { Player }