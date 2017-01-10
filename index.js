var express = require('express')
var path = require('path')

var app = express()

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})
app.use('/en', express.static(path.join(__dirname, '/en')))
app.use('/es', express.static(path.join(__dirname, '/es')))

app.listen(process.env.PORT || 9933, () => {
  console.log('listening on ' + (process.env.PORT || 9933));
})
