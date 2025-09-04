
const { Game } = require('./game.js')

class Schedule {

    constructor(schedule) {
        this.schedule = schedule
        //list of games
    }

    getWeeklyGames(thurs) {

        const oneWeekMS = 7 * 24 * 60 * 60 * 1000

        let weeklyGames = []

        for (let game of this.schedule) {
            let myDiff = game.date - thurs
            if (myDiff >= 0 && myDiff <= oneWeekMS) {
                weeklyGames.push(game)
            }
        }
        return weeklyGames
    }



    //add a handful of functions for manipulating the schedule in case of rain outs etc.

}

module.exports = { Schedule }