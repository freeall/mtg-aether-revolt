var request = require('request')
var cheerio = require('cheerio')
var fs = require('fs')

var PAGE1 = 'http://gatherer.wizards.com/Pages/Search/Default.aspx?output=spoiler&method=visual&sort=cn+&action=advanced&set=+%5b%22Kaladesh%22%5d'
var PAGE2 = 'http://gatherer.wizards.com/Pages/Search/Default.aspx?page=1&output=spoiler&method=visual&sort=cn+&action=advanced&set=+%5b%22Kaladesh%22%5d'
var PAGE3 = 'http://gatherer.wizards.com/Pages/Search/Default.aspx?page=2&output=spoiler&method=visual&sort=cn+&action=advanced&set=+%5b%22Kaladesh%22%5d'

function load () {
  request(PAGE3, (err, res) => {
    if (err) throw err
    fs.writeFileSync('kaladesh3.html', res.body)
  })
}

function parse () {
  var html = fs.readFileSync('kaladesh1.html').toString()
  var $ = cheerio.load(html)
  var $images = $('.visualspoiler a img')
  console.log($images[0])
}

function getImage (i, cb) {
  var id = 417573 + i
  var url = `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${id}&type=card`
  var filename = `en${i}.png`
  if (i < 10) {
    filename = `en00${i}.png`
  } else if (i < 100) {
    filename = `en0${i}.png`
  }

  request(url).pipe(fs.createWriteStream('kaladesh/' + filename)).on('close', cb);
}

(function next (i) {
  getImage(i, (err) => {
    if (err) throw err

    console.log('Downloaded ' + i)
    if (i === 244) return console.log('done')
    next(i + 1)
  })
})(1)
