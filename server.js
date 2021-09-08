const express = require('express')
const app = express()
const port = 3000


app.use('/assets', express.static('assets'))

app.get('/', (req, res) => {
  console.log('redirecionando...')
  res.redirect('/assets/index.html');
})

app.listen(port, () => {
  console.log(`game running at http://localhost:${port}`)
})