
const fs = require('fs')
const xlsx = require('xlsx')
const path = require('path')

const { xlsxToTeamsList, xlsxToSchedule } = require('../controllers/handleExcel.js')
const { Schedule } = require('../models/schedule.js')
const { Division } = require('../models/division.js')
const { Season } = require('../models/season.js')
const { Official } = require('../models/official.js')
const { Admin } = require('../models/admin.js')
const { hasUncaughtExceptionCaptureCallback } = require('process')

test('creates 7 officials and their availability', () => {

    let filePath = path.join(__dirname, 'data/Minor_Division_Team_Roster_Report.xlsx')
    let workbook = xlsx.read(fs.readFileSync(filePath), { type: 'buffer' })
    let data = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
    let myRoster = xlsxToTeamsList(data)
    filePath = path.join(__dirname, 'data/Minor_Regular_Season_Schedule.xlsx')
    workbook = xlsx.read(fs.readFileSync(filePath), { type: 'buffer' })
    data = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
    let mySchedule = xlsxToSchedule(data, myRoster)

    let minorDivision = new Division(myRoster, new Schedule(mySchedule))

    filePath = path.join(__dirname, 'data/Pro_Division_Team_Roster_Report.xlsx')
    workbook = xlsx.read(fs.readFileSync(filePath), { type: 'buffer' })
    data = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
    myRoster = xlsxToTeamsList(data)
    filePath = path.join(__dirname, 'data/Pro_Regular_Season_Schedule.xlsx')
    workbook = xlsx.read(fs.readFileSync(filePath), { type: 'buffer' })
    data = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
    mySchedule = xlsxToSchedule(data, myRoster)
    //puts a schedule together

    let proDivision = new Division(myRoster, new Schedule(mySchedule))

    filePath = path.join(__dirname, 'data/Rookie_Division_Team_Roster_Report.xlsx')
    workbook = xlsx.read(fs.readFileSync(filePath), { type: 'buffer' })
    data = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
    myRoster = xlsxToTeamsList(data)
    filePath = path.join(__dirname, 'data/Rookie_Regular_Season_Schedule.xlsx')
    workbook = xlsx.read(fs.readFileSync(filePath), { type: 'buffer' })
    data = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
    mySchedule = xlsxToSchedule(data, myRoster)
    //puts a schedule together

    let rookieDivision = new Division(myRoster, new Schedule(mySchedule))

    let upcomingThurs = new Date(2025, 4, 1)

    let season = new Season({"Rookie":rookieDivision, "Minor":minorDivision, "Pro": proDivision}, getOfficials(upcomingThurs))

    season.assignOfficials(upcomingThurs)

    let myGames = []

    for (let division of season.getDivisions()) {
        for (let game of division.getSchedule().getWeeklyGames(upcomingThurs)) {
            myGames.push(game.getOfficials())
            
        }
    }

    expect(myGames[0].length).toEqual(4)
    expect(myGames[1].length).toEqual(1)
    expect(myGames[2].length).toEqual(4)
    expect(myGames[3].length).toEqual(3)
    expect(myGames[4].length).toEqual(4)
    expect(myGames[5].length).toEqual(3)
    expect(myGames[6].length).toEqual(4)

    // let myPath = path.join(__dirname,'..', 'data.json')

    // let seasonData = { 
    //     'Admin': [
    //         new Admin(0, 'Arthur', 'Ford')
    //     ],
    //     'seasons': {
    //         "SPRING 25" : season
    //     }
    // }

    // fs.writeFileSync(myPath, JSON.stringify(seasonData, null, 2), 'utf8')


})

function getOfficials(thursday) {
    let myOfficials = []

    let thurs = new Date(thursday.getTime()).getTime()
    let fri = new Date(thurs + 24 * 60 * 60 * 1000).getTime()

    myOfficials.push(new Official(1, "James", "Ford", null));
    myOfficials[0].setAvailability(
        { 
            [thurs]: { 18: true, 19: true, 20: true, 21: true },
            [fri]: { 18: true, 19: true, 20: true, 21: true }
        }
    );

    myOfficials.push(new Official(2, "Bill", "Official", null));
    myOfficials[1].setAvailability(
        { 
            [thurs]: { 18: false, 19: false, 20: false, 21: false },
            [fri]: { 18: false, 19: false, 20: false, 21: false }
        }
    );

    myOfficials.push(new Official(3, "Daniel", "Reed", null));
    myOfficials[2].setAvailability(
        {
            [thurs]: { 18: false, 19: false, 20: true, 21: true},
            [fri]: { 18: true, 19: true, 20: true, 21: true }
        }
    );

    myOfficials.push(new Official(4, "Olivia", "Martinez", null));
    myOfficials[3].setAvailability(
        {
            [thurs]: { 18: false, 19: false, 20: false, 21: false },
            [fri]: { 18: true, 19: true, 20: true, 21: true }
        }
    );

    myOfficials.push(new Official(5, "Ethan", "Collins", null));
    myOfficials[4].setAvailability(
        {
            [thurs]: { 18: true, 19: true, 20: true, 21: true },
            [fri]: { 18: false, 19: false, 20: false, 21: false }
        }
    );

    myOfficials.push(new Official(6, "Sophia", "Hughes", null));
    myOfficials[5].setAvailability(
        {
            [thurs]: { 18: true, 19: true, 20: true, 21: true },
            [fri]: { 18: true, 19: true, 20: false, 21: false }
        }
    );

    myOfficials.push(new Official(7, "Liam", "Peterson", null));
    myOfficials[6].setAvailability(
        {
            [thurs]: { 18: true, 19: false, 20: false, 21: false },
            [fri]: { 18: true, 19: true, 20: true, 21: true }
        }
    );

    myOfficials.push(new Official(8, "Billiam", "Flay", null));
    myOfficials[7].setAvailability(
        {
            [thurs]: { 18: false, 19: false, 20: true, 21: true },
            [fri]: { 18: false, 19: false, 20: true, 21: true }
        }
    );

    myOfficials.push(new Official(9, "Pete", "Griffin", null));
    myOfficials[8].setAvailability(
        {
            [thurs]: { 18: true, 19: false, 20: false, 21: false },
            [fri]: { 18: false, 19: true, 20: true, 21: true }
        }
    );

    myOfficials.push(new Official(10, "Lois", "Griffin", null));
    myOfficials[9].setAvailability(
        {
            [thurs]: { 18: true, 19: true, 20: true, 21: true},
            [fri]: { 18: false, 19: true, 20: true, 21: true}
        }
    );

    return myOfficials
}
