import fs from 'fs'
import path from 'path'

const DATA_PATH = path.resolve('./data/claims.json')

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { code, user } = req.query
  if (!code || !user) {
    return res.status(400).json({ error: 'Missing code or user' })
  }

  let db = {}
  if (fs.existsSync(DATA_PATH)) {
    db = JSON.parse(fs.readFileSync(DATA_PATH))
  }

  if (!db[code]) {
    return res.status(404).json({ error: 'Invalid code' })
  }

  if (db[code].claimed) {
    return res.status(410).json({ error: 'Code already claimed' })
  }

  db[code].claimed = true
  db[code].claimedBy = user
  db[code].claimedAt = Date.now()

  fs.writeFileSync(DATA_PATH, JSON.stringify(db, null, 2))

  return res.json({
    success: true,
    reward: db[code].reward
  })
}
