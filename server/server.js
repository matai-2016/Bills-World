const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const webScraper = require('./web-scraper')
const saveScrape = require('./save-scrape')

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')))

//  routes
const usersRoutes = require('./routes/users')
// const billsRoutes = require('./routes/bills')
// const billRoutes = require('./routes/bill')

app.use('/users', usersRoutes)
// app.use('/bills', billsRoutes)
// app.use('/bill', billRoutes)

app.get('/scrape', (req, res) => {
  webScraper(function (err, data) {
    if (err) {
      return console.log('Web Scraper Error')
    }
    res.send(data)
    saveScrape(data)
  })
})

// app.use('/bills', billsRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
})


module.exports = app
