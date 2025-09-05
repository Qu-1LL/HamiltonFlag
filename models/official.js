
const { User } = require('./user.js')

class Official extends User {

    constructor(id, firstName, lastName, contactInfo) {
        super(id, firstName, lastName, 'Official')
        this.contactInfo = contactInfo
        this.availability = {}
    }

    getContactInfo() {
        return this.contactInfo
    }

    setAvailability(week) {
        for (let time of Object.keys(week)) {
            this.availability[time] = week[time]
        }
    }

    isAvailable(date, time) {
        return this.availability[date][time]
    }

    // eg
    //      mon-time : {6: true, 7: true, 8: true, 9: true},
    //      tues-time: {6: true, 7: true, 8: true, 9: true},
    //      wed-time: {6: true, 7: true, 8: true, 9: true},
    //      thurs-time: {6: true, 7: true, 8: true, 9: true},
    //      fri-time: {6: true, 7: false, 8: false, 9: false},
    //      sat-time: {6: true, 7: false, 8: false, 9: false},
    //      sun-time: {6: false, 7: false, 8: false, 9: false}
    //      
    // 

}

module.exports = { Official }