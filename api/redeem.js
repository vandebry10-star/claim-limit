// api/redeem.js
export default function handler(req, res) {
  const { code } = req.query
  if (!code) return res.status(400).json({ status: false })

  const store = global.claimStore || {}

  const entry = Object.values(store).find(
    v => v.code === code && !v.used
  )

  if (!entry) {
    return res.status(400).json({
      status: false,
      message: 'Kode tidak valid / sudah dipakai'
    })
  }

  entry.used = true

  return res.json({
    status: true,
    reward: entry.reward
  })
}
