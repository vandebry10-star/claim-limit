import store from '../lib/store.js'

export default function handler(req, res) {
  const { code } = req.query
  if (!code) return res.json({ ok: false })

  const data = store.codes[code]
  if (!data || data.used) {
    return res.json({ ok: false })
  }

  data.used = true

  res.json({
    ok: true,
    reward: {
      limit: 10,
      exp: 5000
    }
  })
}
