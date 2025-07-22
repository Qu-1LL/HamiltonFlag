
//holds all the data relevant to a single division, including schedule and teams

class Division {

    constructor(teams, schedule) {
        this.teams = teams
        this.schedule = schedule
    }

    getTeams() {
        return this.teams
    }

    getSchedule() {
        return this.schedule
    }

}

module.exports = { Division }