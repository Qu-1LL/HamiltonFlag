

export class User {

    constructor (firstName, lastName, id) {
        this.firstName = firstName
        this.lastName = lastName
        this.id = id
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