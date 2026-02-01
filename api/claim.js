import store from '../lib/store.js'

function randomCode(len = 8) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let out = ''
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)]
  }
  return out
}

export default function handler(req, res) {
  const { sid } = req.query
  if (!sid) return res.status(400).send('Invalid session')

  if (store.sessions[sid]) {
    return res.send('<h2>❌ Session sudah dipakai</h2>')
  }

  const code = randomCode()
  store.sessions[sid] = true
  store.codes[code] = { used: false }

  res.setHeader('Content-Type', 'text/html')
  res.send(`
    <h1>🎉 Claim Limit Kamu</h1>
    <p>Terima kasih sudah melewati iklan 🙏</p>
    <h3>Kode kamu:</h3>
    <code style="font-size:24px">${code}</code>
    <p><br>Gunakan di grup:</p>
    <b>.claim ${code}</b>
  `)
}
