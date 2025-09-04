
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
        return Object.values(this.divisions)
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

    assignOfficials(thurs) {
        let myGames = []
        for (let division of Object.values(this.divisions)) {
            for (let game of division.schedule.getWeeklyGames(thurs)) {
                myGames.push(game)
            }
        }
        let officialsDict = {}
        for (let official of this.officials) {
            officialsDict[official.id] = 0
        }

        for (let game of myGames) {
            //console.log(game.id)
            for( let i = 0; i < 4; i++) {
                let myOfficial = this.getLowestOfficial(this.officials, officialsDict, game.date, Number(game.startTime.split(':')[0]), myGames )
                if (myOfficial == null) {
                    break
                    //maybe send warning if official count is too low
                }
                //console.log(i, myOfficial)
                game.addOfficial(myOfficial)
                officialsDict[myOfficial.id]++
            }
            //console.log(game.officials)
        }
    }

    getLowestOfficial(officials,officialsDict,date,time,games) {
        let lowestOfficial = null
        let lowestCount = Number.MAX_SAFE_INTEGER

        for(let official of officials) {
            if (this.officialIsntDoubleBooked(official,date,time,games) && official.isAvailable(date.getTime(),time) && officialsDict[official.id] < lowestCount) {
                lowestCount = officialsDict[official.id]
                lowestOfficial = official
            }
        }
        return lowestOfficial
    }

    officialIsntDoubleBooked(official, date, time, games) {
        for (let game of games) {
            if (game.date.getTime() == date.getTime() && Number(game.startTime.split(':')[0]) == time) {
                let myOfficials = game.getOfficials()
                for (let gameOfficial of myOfficials) {
                    if (gameOfficial == official.id) {
                        return false
                    }
                }
            }
        }
        return true
    }

}

module.exports = { Season }