
//use id system from mongoose

class User {

    constructor (id, firstName, lastName, title, username = firstName, password = 'password') {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.username = username
        this.password = password
        this.title = title
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