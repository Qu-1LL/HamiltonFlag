
const xlsx = require('xlsx')
const multer = require('multer')
const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const { xlsxToTeamsList, xlsxToSchedule } = require('./controllers/handleExcel.js')

const app = express()
const port = 3000

app.use(cors({
    origin: 'http://localhost:5000'
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
    try {
        let filePath = path.join(__dirname, './__tests__/data/Minor_Division_Team_Roster_Report.xlsx')
        let workbook = xlsx.read(fs.readFileSync(filePath), { type: 'buffer' })
        let data = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
        let myRoster = xlsxToTeamsList(data)

        filePath = path.join(__dirname, './__tests__/data/Minor_Regular_Season_Schedule.xlsx')
        workbook = xlsx.read(fs.readFileSync(filePath), { type: 'buffer' })
        data = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
        let mySchedule = xlsxToSchedule(data, myRoster)

        res.json({ mySchedule })
    } catch (e) {
        console.error('Error fethcing schedule: ' + e)
        res.status(500).json({ error: 'Failed to retreive schedule information'})
    }
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
