

import * as xlsx from 'xlsx'
import * as multer from 'multer'
import * as express from 'express'

const app = express()

/* 
User will upload xlsx file to react app
file will be sent here as buffer
use xlsx library to read and covnert to json
send json back to front end for visual approval and manual rearrangement if neccesary
once manually approved, sent back to server to be held as updated info for the current season.
*/