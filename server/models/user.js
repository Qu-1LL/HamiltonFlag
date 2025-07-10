
//import random to get id

class User {

    constructor (firstName, lastName) {
        this.firstName = firstName
        this.lastName = lastName
        this.id = 13
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