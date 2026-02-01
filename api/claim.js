import crypto from 'crypto'

const SECRET = process.env.CLAIM_SECRET || 'azbry-secret'

function sign(data) {
  return crypto
    .createHmac('sha256', SECRET)
    .update(data)
    .digest('hex')
}

export default function handler(req, res) {
  const today = new Date().toISOString().slice(0, 10)

  const payload = JSON.stringify({
    date: today,
    reward: { limit: 10, exp: 5000 }
  })

  const sig = sign(payload)

  const code = Buffer.from(payload).toString('base64') + '.' + sig

  res.json({
    status: true,
    code
  })
}
