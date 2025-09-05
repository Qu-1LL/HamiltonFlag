
class Game {

    constructor(id, awayTeam, homeTeam, round, startTime, endTime, date, location, field, officials=[]) {
        this.id = id
        this.awayTeam = awayTeam.id
        this.homeTeam = homeTeam.id
        this.round = round
        this.startTime = startTime
        this.endTime = endTime
        this.date = date
        this.location = location
        this.field = field
        this.progress = 'future'
        //overarching system will check game's date vs current date and change to either "today" or "past"

        this.awayTeamAttendence = awayTeam.players.reduce((team, player) => {
            team[player.id] = false
            return team
        }, {})
        this.awayTeamLineup = null
        this.homeTeamAttendence = homeTeam.players.reduce((team, player) => {
            team[player.id] = false
            return team
        }, {})
        this.homeTeamLineup = null

        this.score = {home: 0, away: 0}
        this.officials = officials
        this.officialCount = 0
    }

    getAwayTeam() {
        return this.awayTeam
    }

    getHomeTeam() {
        return this.homeTeam
    }

    getRound() {
        return this.round
    }

    getStartTime() {
        return this.startTime
    }

    getEndTime() {
        return this.endTime
    }

    getDate() {
        return this.date
    }

    getLocation() {
        return this.location
    }

    getField() {
        return this.field
    }

    //attendence
    setAwayTeamAttendence(attendence) {
        this.awayTeamAttendence = attendence
    }

    setHomeTeamAttendence(attendence) {
        this.homeTeamAttendence = attendence
    }

    getAttendence() {
        return {'home': this.homeTeamAttendence, 'away': this.awayTeamAttendence}
    }

    getAwayTeamAttendence() {
        return this.awayTeamAttendence
    }

    getHomeTeamAttendence() {
        return this.homeTeamAttendence
    }

    //lineups
    getAwayTeamLineup() {
        return this.awayTeamLineup
    }

    getHomeTeamLineup() {
        return this.homeTeamLineup
    }

    getLineup() {
        return {'home': this.homeTeamLineup, 'away': this.awayTeamLineup}
    }

    setAwayTeamLineup(lineup) {
        this.awayTeamLineup = lineup
    }

    setHomeTeamLineup(lineup) {
        this.homeTeamLineup = lineup
    }

    //score
    setHomeTeamScore(score) {
        this.score['home'] = score
    }

    setAwayTeamScore(score) {
        this.score['away'] = score
    }

    getScore() {
        return this.score
    }

    getHomeTeamScore() {
        return this.score['home']
    }

    getAwayTeamScore() {
        return this.score['away']
    }

    //progress
    getProgress() {
        return this.progress
    }

    setProgress(progress) {
        this.progress = progress
    }

    //officials
    getOfficials() {
        return this.officials
    }
    
    getOfficialCount() {
        return this.officialCount
    }

    addOfficial(official) {
        const index = this.officials.findIndex(o => o === official.id)
        if (index > -1) {
            this.officials[index] = official.id
        } else {
            this.officials.push(official.id)
        }
        this.officialCount = this.officials.length;
    }

    removeOfficial(official) {
        this.officials = this.officials.filter((o) => {
            o.id !== official.id
        })
        this.officialCount = this.officials.length
    }

}

module.exports = { Game }