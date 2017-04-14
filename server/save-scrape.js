const config = require('../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = saveScrape

function writeScrapedDataToDb (data) {
  console.log('Save Scraper')
  data.map((bill) => {
    return knex('bills')
      .select('bill_number')
      .then((billNumbers) => {
        let filtered = billNumbers.filter((billNumber) => {
          return billNumber.bill_number === bill.bill_number
        })
        if (filtered.length === 0) {
          return knex('bills').insert(bill)
        } else if (filtered.length > 0) {
          return knex('bills').where(filtered[0], bill.bill_number).update(bill)
        }
      })
      .catch(function (err) {
        console.error(err)
      })
  })
}
