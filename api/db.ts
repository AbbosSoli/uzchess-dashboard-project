import { VercelRequest, VercelResponse } from '@vercel/node'
import * as fs from 'fs'
import * as path from 'path'

// Path to db.json inside the api folder
const dbFilePath = path.join(__dirname, 'db.json')

export default (req: VercelRequest, res: VercelResponse) => {
	fs.readFile(dbFilePath, 'utf8', (err, data) => {
		if (err) {
			res.status(500).json({ message: 'Error reading db.json' })
			return
		}
		res.status(200).json(JSON.parse(data))
		
	})
}
