// api/claim.js
import crypto from 'crypto'

const store = global.claimStore || (global.claimStore = {})

export default function handler(req, res) {
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket.remoteAddress

  const today = new Date().toISOString().slice(0, 10)
  const key = `${ip}-${today}`

  if (store[key]) {
    return res.status(429).json({
      status: false,
      message: 'Kamu sudah claim hari ini'
    })
  }

  const code = crypto.randomBytes(4).toString('hex').toUpperCase()

  store[key] = {
    code,
    used: false,
    reward: { limit: 10, exp: 5000 }
  }

  return res.json({
    status: true,
    code,
    reward: store[key].reward
  })
}
