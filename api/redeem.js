import crypto from 'crypto'

const SECRET = process.env.CLAIM_SECRET || 'azbry-secret'

function sign(data) {
  return crypto
    .createHmac('sha256', SECRET)
    .update(data)
    .digest('hex')
}

export default function handler(req, res) {
  const { code } = req.query
  if (!code) return res.json({ status: false })

  const [b64, sig] = code.split('.')
  if (!b64 || !sig) {
    return res.json({ status: false, message: 'Kode rusak' })
  }

  const payload = Buffer.from(b64, 'base64').toString()
  const expected = sign(payload)

  if (sig !== expected) {
    return res.json({ status: false, message: 'Kode tidak valid' })
  }

  const data = JSON.parse(payload)
  const today = new Date().toISOString().slice(0, 10)

  if (data.date !== today) {
    return res.json({ status: false, message: 'Kode kadaluarsa' })
  }

  res.json({
    status: true,
    reward: data.reward
  })
}
