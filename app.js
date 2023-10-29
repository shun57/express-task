const express = require('express')
const app = express()
const port = 8080

app.use(express.json())
app.use(express.static('public'))

// GET method route
app.get('/', (req, res) => {
  res.cookie('hostsite', 'firstparty', {
    httpOnly: true,
  })
  res.sendFile('public/app.html', { root: __dirname })
})

// POST method route
app.post('/', (req, res) => {
  if (!req.is('application/json')) {
    res.sendStatus(400)
  }
  console.log(req.body)
  res.status(201).json(req.body)
})

app.listen(port, () => {
  console.log(`host app listening on port ${port}`)
})

// 広告配信サーバ

const adApp = express()
adApp.use(
  express.static('public', {
    setHeaders: function (res, path, stat) {
      // クッキーを設定
      res.cookie('adsite', 'thirdparty', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
    },
  })
)

adApp.listen(8081, () => {
  console.log('ad app listening on port 8081')
})
