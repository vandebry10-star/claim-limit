export default function handler(req, res) {
  try {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()

    res.status(200).json({
      status: 'success',
      message: 'Claim API aktif',
      code,
      reward: {
        limit: 10,
        exp: 5000
      }
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    })
  }
}
