import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'claims.json')

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '{}')
  }

  const claims = JSON.parse(fs.readFileSync(dataPath))

  const code = Math.random().toString(36).substring(2, 10).toUpperCase()

  claims[code] = {
    limit: 10,
    exp: 5000,
    claimed: false,
    createdAt: Date.now()
  }

  fs.writeFileSync(dataPath, JSON.stringify(claims, null, 2))

  return res.json({
    status: 'success',
    code,
    reward: {
      limit: 10,
      exp: 5000
    }
  })
}
