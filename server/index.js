
import * as xlsx from 'xlsx'
import * as multer from 'multer'
import * as express from 'express'

// const xlsx = require('xlsx')
// const multer = require('multer')
// const express = require('express')

import { UploadXLSX } from './controllers/handleExcel.js'

const app = express()
const port = 3000

const upload = multer({ storage: multer.memoryStorage() })

const uploadXLSX = new UploadXLSX()

app.post('/upload-roster-xlsx', upload.single('file'), (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({error: 'No file uploaded' })
        }

        let workbook = xlsx.read(req.file.fileBuffer, { type: 'buffer' })

        let worksheet = workbook.Sheets[workbook.SheetNames[0]]

        let data = xlsx.utils.sheet_to_json(worksheet)

        //send data to frontend for approval, wont be added to mongoose until approved by admin manually

        res.json({ data })
    } catch (e) {
        console.error('Error reading file:', e)
        res.status(500).json({ error: 'Failed to process .xlsx file, or not an xlsx file' })
    }
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
