
//use id system from mongoose

class User {

    constructor (firstName, lastName) {
        this.firstName = firstName
        this.lastName = lastName
    }

    getFirstName() {
        return this.firstName
    }

    getLastName() {
        return this.lastName
    }

    getId() {
        return this.id
    }

}

module.exports = { User }