
class ContactInfo {

    constructor(name, id, email="", phone="") {
        this.id = id
        this.name = name
        this.email = email
        this.phone = phone
    }

    getName() {
        return this.name
    }

    getEmail() {
        return this.email
    }

    getPhone() {
        return this.phone
    }

    setPhone(phone) {
        this.phone = phone
    }

    setEmail(email) {
        this.email = email
    }

    getId() {
        return this.id
    }

}

module.exports = { ContactInfo }