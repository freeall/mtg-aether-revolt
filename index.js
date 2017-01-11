var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')

var app = express()

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})
app.use('/en', serveStatic(path.join(__dirname, '/en'), { maxAge: '1y' }))
app.use('/es', serveStatic(path.join(__dirname, '/es'), { maxAge: '1y' }))

app.listen(process.env.PORT || 9933, () => {
  console.log('listening on ' + (process.env.PORT || 9933));
})
