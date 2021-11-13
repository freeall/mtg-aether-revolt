var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')

var app = express()

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
  // TODO: set maxAge 1 day
})
app.use('/icons', serveStatic(path.join(__dirname, '/icons'), { maxAge: '1y'}))
app.use('/kaladesh/en', serveStatic(path.join(__dirname, '/kaladesh/en'), { maxAge: '1y' }))
app.use('/kaladesh/es', serveStatic(path.join(__dirname, '/kaladesh/es'), { maxAge: '1y' }))
app.use('/aetherrevolt/en', serveStatic(path.join(__dirname, '/aetherrevolt/en'), { maxAge: '1y' }))
app.use('/aetherrevolt/es', serveStatic(path.join(__dirname, '/aetherrevolt/es'), { maxAge: '1y' }))

app.listen(process.env.PORT || 9933, () => {
  console.log('listening on ' + (process.env.PORT || 9933));
})
