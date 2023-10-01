const express = require('express')
const app = express()
const port = 8080

app.use(express.json())

// GET method route
app.get('/', (req, res) => {
  res.status(200).json({ text: 'hello world' })
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
  console.log(`Example app listening on port ${port}`)
})
