
class ContactInfo {

    constructor(name, email="", phone="") {
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

}

module.exports = { ContactInfo }