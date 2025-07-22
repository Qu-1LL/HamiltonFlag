
//holds all the information relevant to a single season, all divisions, subscribers, login information, notification list, etc.

class Season {

    constructor(divisions, officials = [], subscribers = []) {
        this.divisions = divisions
        this.officials = officials
        this.officialCount = officials.length
        this.subscribers = subscribers // people to be notified when the schedule changes
        for (let official of this.officials) {
            subscribers.push(official.getContactInfo())
        }
        this.subscriberCount = subscribers.length
    }

    getDivisions() {
        return this.divisions
    }

    //officials
    getOfficials() {
        return this.officials
    }
    
    getOfficialCount() {
        return this.officialCount
    }

    addOfficial(official) {
        this.removeOfficial(official)
        this.officials.push(official)
        this.officialCount = this.officials.length
    }

    removeOfficial(official) {
        this.officials = this.officials.filter((o) => {
            o.name != official.name
        })
        this.officialCount = this.officials.length
    }

    //subscribers
    getSubscribers() {
        return this.subscribers
    }
    
    getSubscriberCount() {
        return this.subscriberCount
    }

    addSubscriber(subscriber) {
        this.removeSubscriber(subscriber)
        this.subscribers.push(subscriber)
        this.subscriberCount = this.subscribers.length
    }

    removeSubscriber(subscriber) {
        this.subscribers = this.subscribers.filter((o) => {
            o.name != subscriber.name
        })
        this.subscriberCount = this.subscribers.length
    }

}

module.exports = { Season }