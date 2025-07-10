
const fs = require('fs')
const xlsx = require('xlsx')
const path = require('path')

const { xlsxToTeamsList } = require('../controllers/handleExcel.js')

test('parses sample xlsx file', () => {
    let filePath = path.join(__dirname, 'data/Minor_Division_Team_Roster_Report.xlsx')

    let workbook = xlsx.read(fs.readFileSync(filePath), { type: 'buffer' })

    let data = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])

    let myRoster = xlsxToTeamsList(data)

    //checking team names
    expect(myRoster.length).toBe(4)
    expect(myRoster[0].getTeamName()).toBe("Bills")
    expect(myRoster[1].getTeamName()).toBe("Commanders")
    expect(myRoster[2].getTeamName()).toBe("Falcons")
    expect(myRoster[3].getTeamName()).toBe("Vikings")

    //checking first team size
    expect(myRoster[0].getPlayerCount()).toBe(11)
    expect(myRoster[0].getPersonnelCount()).toBe(2)

    //checking first player
    let myPlayer = myRoster[0].getPlayers()[0]
    expect(myPlayer.getFirstName()).toBe("Alexander")
    expect(myPlayer.getLastName()).toBe("Royal")
    expect(myPlayer.getAccountFirstName()).toBe("John")
    expect(myPlayer.getAccountLastName()).toBe("Alexander")

    //checking last personnel
    let myPersonnel = myRoster[3].getPersonnel()[0]
    expect(myPersonnel.getFirstName()).toBe("Anthony")
    expect(myPersonnel.getLastName()).toBe("Dipaola")

    let myContactInfo = myPersonnel.getContactInfo()
    expect(myContactInfo.getName()).toBe("Anthony Dipaola")
    expect(myContactInfo.getEmail()).toBe("dipaola75@gmail.com")
    expect(myContactInfo.getPhone()).toBe("609-532-5665")
})
