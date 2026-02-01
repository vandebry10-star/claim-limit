import fs from 'fs'
import path from 'path'

const storePath = path.join(process.cwd(), 'data/store.json')

function loadStore() {
  return JSON.parse(fs.readFileSync(storePath, 'utf8'))
}

function saveStore(data) {
  fs.writeFileSync(storePath, JSON.stringify(data, null, 2))
}

function randomCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase()
}

export default function handler(req, res) {
  const store = loadStore()

  let code
  do {
    code = randomCode()
  } while (store.tokens[code])

  store.tokens[code] = {
    used: false,
    createdAt: Date.now()
  }

  saveStore(store)

  res.setHeader('Content-Type', 'text/html')
  res.status(200).send(`
    <h1>🎉 Claim Limit Kamu Disini</h1>
    <p>Terima kasih sudah melewati iklan 🙏</p>

    <h2>🎟 KODE KLAIM KAMU:</h2>
    <code style="font-size:20px">${code}</code>

    <p><b>Cara pakai:</b></p>
    <ol>
      <li>Salin kode di atas</li>
      <li>Masuk ke grup Azbry-MD</li>
      <li>Ketik: <code>.claim ${code}</code></li>
    </ol>

    <small>Kode hanya bisa dipakai 1x</small>
  `)
}
