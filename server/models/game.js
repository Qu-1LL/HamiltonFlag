
export class Game {

    constructor(awayTeam, homeTeam, startTime, endTime, date, location, field) {
        this.awayTeam = awayTeam
        this.homeTeam = homeTeam
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

        this.score = {'home': 0, 'away': 0}
    }

    getAwayTeam() {
        return this.awayTeam
    }

    getHomeTeam() {
        return this.homeTeam
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

}