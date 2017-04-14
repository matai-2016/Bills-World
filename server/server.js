const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

const app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')))

const authRoutes = require('./routes/auth')
const billsRoutes = require('./routes/bills')
const billRoutes = require('./routes/bill')

app.use('/auth', authRoutes)
app.use('/bills', billsRoutes)
app.use('/bill', billRoutes)

app.get('/scrape', (req, res) => {
  const data = []
  const url = 'https://www.parliament.nz/en/pb/bills-and-laws/bills-proposed-laws/current?Criteria.PageNumber=1&Criteria.DocumentStatus=Current&Criteria.ViewAll=1&Criteria.ViewDetails=1'
  request(url, function (error, response, html) {
    if (!error) {
      let $ = cheerio.load(html)
      $('tr.list__row').each(function (i) {
        let obj = {}

        obj.title = $(this).children('td').children('h2').text()

        const introduction_date = $(this).children('td').children('div').children('body').children('div').children('table').children('tbody:nth-child(1)').children('tr:nth-child(5)').children('td').text()
        const introductionDate = introduction_date.replace(/(\r\n|\n|\r|\t|\s)/gm, '')
        obj.introduction_date = introductionDate

        const member = $(this).children('td').children('div').children('body').children('div').children('table').children('tbody:nth-child(1)').children('tr:nth-child(1)').children('td').text()
        const memberInCharge = member.replace(/(\r\n|\n|\r|\t|\s+)/gm, ' ')
        obj.member_in_charge = memberInCharge

        const type = $(this).children('td').children('div').children('body').children('div').children('table').children('tbody:nth-child(1)').children('tr:nth-child(2)').children('td').text()
        const newType = type.replace(/(\r\n|\n|\r|\t|\s)/gm, '')
        obj.type = newType

        const bill_number = $(this).children('td').children('div').children('body').children('div').children('table').children('tbody:nth-child(1)').children('tr:nth-child(4)').children('td').text()
        const billNumber = bill_number.replace(/(\r\n|\n|\r|\t|\s)/gm, '')
        obj.bill_number = billNumber

        $(this).children('td').children('div').children('body').children('div').children('table').empty()
        const summary = $(this).children('td').children('div').children('body').children('div').not('table').text()
        const summaryFormatted = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, ' ')
        obj.summary = summaryFormatted

        data.push(obj)
      })
      console.log(data)
    }
    fs.writeFile('./server/lib/scrapedData.json', JSON.stringify(data, null, 4), function (err) {
      if (!err) {
        console.log('Check scrapedData')
      }
    })
    res.send('Data sent to scrapedData.json')
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
})


module.exports = app
