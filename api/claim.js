import fs from 'fs'
import path from 'path'

const storePath = path.join(process.cwd(), 'data/store.json')

function loadStore() {
  return JSON.parse(fs.readFileSync(storePath, 'utf8'))
}

function saveStore(data) {
  fs.writeFileSync(storePath, JSON.stringify(data, null, 2))
}

export default function handler(req, res) {
  const { code } = req.query
  if (!code) {
    return res.status(400).json({ status:false, message:'Kode kosong' })
  }

  const store = loadStore()
  const token = store.tokens[code]

  if (!token) {
    return res.status(404).json({ status:false, message:'Kode tidak valid' })
  }

  if (token.used) {
    return res.status(403).json({ status:false, message:'Kode sudah dipakai' })
  }

  token.used = true
  token.usedAt = Date.now()
  saveStore(store)

  res.json({
    status: true,
    reward: {
      limit: 10,
      exp: 5000
    }
  })
}
