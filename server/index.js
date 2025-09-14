
const xlsx = require('xlsx')
const multer = require('multer')
const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const { ContactInfo } = require('./models/contactInfo.js')

const { xlsxToTeamsList, xlsxToSchedule } = require('./controllers/handleExcel.js')
const { attemptLogin } = require('./controllers/handleLogging.js')
const { updateAvailability, setGameOfficials, getWeeklyGames } = require('./controllers/handleOfficials.js')
const { getOfficialById, getSchedule, getTeamById, getOfficials } = require('./controllers/handleGet.js')
const { removeOfficialFromGame, addOfficialToGame} = require('./controllers/handleSchedule.js')

const app = express()
var port = 5000

app.use(express.json())

const allowedOrigins = [
    `http://100.28.121.224:${port}`,  // your VM
    `http://localhost:${port}`,          // React dev server
]

    app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    }
}))

const upload = multer({ storage: multer.memoryStorage() })

app.post('/upload-roster-xlsx', upload.single('file'), (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({error: 'No file uploaded' })
        }

        let workbook = xlsx.read(req.file.fileBuffer, { type: 'buffer' })

        let worksheet = workbook.Sheets[workbook.SheetNames[0]]

        let data = xlsx.utils.sheet_to_json(worksheet)

        myTeams = xlsxToTeamsList(data)

        let json = JSON.stringify(myTeams)

        //send data to frontend for approval, wont be added to mongoose until approved by admin manually

        res.json({ json })
    } catch (e) {
        console.error('Error reading file:', e)
        res.status(500).json({ error: 'Failed to process .xlsx file, or not an xlsx file' })
    }
})

app.get('/schedule', (req, res) => {
    console.log("schedule endpoint reached")
    try {
        let mySchedule = getSchedule()

        res.json({ mySchedule })
    } catch (e) {
        console.error('Error fethcing schedule: ' + e)
        res.status(500).json({ error: 'Failed to retreive schedule information'})
    }
})

app.get('/contacts', (req, res) => {
    try {
        let info = [ 
            new ContactInfo('John React', 1, "johnr@smellmail.com"),
            new ContactInfo('Emily Bobathon', 2, 'Ebob@bobworldorder.com'),
            new ContactInfo('Gregory Games', 3, 'contact@gregsgames.com','609-203-4435') 
        ]
        let officials = [
            new ContactInfo('John Official', 4, "johno@smellmail.com", '549-234-john'),
            new ContactInfo('Bob Official', 5, 'notbobo@officials.com'),
            new ContactInfo('Gregory McOfficials', 6, 'gregmail@gregmail.com','666-233-evil'),
            new ContactInfo('Bill Referee', 7, "bestref@smellmail.com") 
        ]
        res.json({ info, officials })
    } catch (e) {
        console.error('Error fethcing schedule: ' + e + e.stack)
        res.status(500).json({ error: 'Failed to retreive schedule information'})
    }
})

app.patch('/login', (req, res) => {
    try {
        let myUser = attemptLogin(req.body.username, req.body.password)

        if (myUser === null) {
            res.status(404).json({ error: 'No user found with that username and password'})
            return
        }

        res.json({'user': myUser})
    } catch (e) {
        console.error('Error logging in: ' + e + e.stack)
        res.status(500).json({ error: 'Encountered an error trying to log in'})
    }
})

app.patch('/availability', (req, res) => {

    try {
        updateAvailability(req.body.officialId, req.body.availability)

        res.status(200).send('Success')
    } catch (e) {
        console.error('Error updating availability: ', e + e.stack)
        res.status(500).json({ error: 'Encountered an error while updating availability'})
    }

})

app.patch('/add-official', (req, res) => {

    try {
        addOfficialToGame(req.body.gameId, req.body.officialId)

        res.status(200).send('Success')
    } catch (e) {
        console.error('Error adding official to game: ', e + e.stack)
        res.status(500).json({ error: 'Encountered an error while adding official to game'})
    }

})

app.patch('/remove-official', (req, res) => {

    try {
        removeOfficialFromGame(req.body.gameId, req.body.officialId)

        res.status(200).send('Success')
    } catch (e) {
        console.error('Error removing official from game: ', e + e.stack)
        res.status(500).json({ error: 'Encountered an error while removing official from game'})
    }

})

app.post('/generate-official-schedule', (req, res) => {
    try{
        let myWeeklySchedule = setGameOfficials(new Date(2025, 3, 30))

        res.json({myWeeklySchedule})
    } catch (e) {
        console.error('Error gneerating the weekly schedule: ' + e+ e.stack)
        res.status(500).json({error: 'Encountered an error while trying to generate the weekly schedule'})
    }
})

app.get('/team', (req, res) => {

    try {
        let myId = req.query.id

        res.json({team : getTeamById(myId)})
    } catch (e) {
        console.error('Error getting team: ' + e + e.stack)
        res.status(500).json({error: 'Encountered an error whole trying to get team info from id'})
    }

})

app.get('/officials', (req,res) => {

    try {
        res.json({officials : getOfficials()})
    } catch(e) {
        console.error('Error getting officials list: ' + e + e.stack)
        res.status(500).json({error: 'Encountered an error while trying to get officials list'})
    }

})

app.get('/weekly-games', (req,res) => {

    try {
        let today = new Date(2025, 3, 30)
        let daysUntilThursday = (4 - today.getDay() + 7) % 7 || 7
        let nextThursday = new Date(today.getTime() + daysUntilThursday * 24 * 60 * 60 * 1000)

        let weeklyGames = getWeeklyGames(nextThursday)

        res.json({games : weeklyGames})

    } catch (e) {
        console.error('Error getting this weeks games: ' + e + e.stack)
        res.status(500).json({ error: 'Encountered an error while trying to get this weeks games'})
    }

})

port = 3000
const host = '0.0.0.0'

app.listen(port, () => {
  console.log(`Server listening on http://${host}:3000`);
});
