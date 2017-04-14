const request = require('request')
const cheerio = require('cheerio')

module.exports = webScraper

function webScraper (cb) {
  const data = []
  const url = 'https://www.parliament.nz/en/pb/bills-and-laws/bills-proposed-laws/current?Criteria.PageNumber=1&Criteria.DocumentStatus=Current&Criteria.ViewAll=1&Criteria.ViewDetails=1'
  request(url, function (error, response, html) {
    if (error) {
      return cb(error)
    }
    let $ = cheerio.load(html)
    $('tr.list__row').each(function (i) {
      let obj = {}

      obj.title = $(this).children('td').children('h2').text()

      let introductionDate = $(this).children('td').children('div').children('body').children('div').children('table').children('tbody:nth-child(1)').children('tr:nth-child(5)').children('td').text()
      introductionDate = introductionDate.replace(/(\r\n|\n|\r|\t|\s)/gm, '')
      obj.introduction_date = introductionDate

      let memberInCharge = $(this).children('td').children('div').children('body').children('div').children('table').children('tbody:nth-child(1)').children('tr:nth-child(1)').children('td').text()
      memberInCharge = memberInCharge.replace(/(\r\n|\n|\r|\t|\s+)/gm, ' ')
      obj.member_in_charge = memberInCharge

      let type = $(this).children('td').children('div').children('body').children('div').children('table').children('tbody:nth-child(1)').children('tr:nth-child(2)').children('td').text()
      type = type.replace(/(\r\n|\n|\r|\t|\s)/gm, '')
      obj.type = type

      let billNumber = $(this).children('td').children('div').children('body').children('div').children('table').children('tbody:nth-child(1)').children('tr:nth-child(4)').children('td').text()
      billNumber = billNumber.replace(/(\r\n|\n|\r|\t|\s)/gm, '')
      obj.bill_number = billNumber

      $(this).children('td').children('div').children('body').children('div').children('table').empty()
      let summary = $(this).children('td').children('div').children('body').children('div').not('table').text()
      summary = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, ' ')
      obj.summary = summary

      data.push(obj)
    })
    cb(null, data)
  })
}
