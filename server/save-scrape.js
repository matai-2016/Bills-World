const config = require('../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = saveScrape

function saveScrape (data) {
  console.log('Save Scraper')
  data.map((bill) => {
    return knex('bills')
      .select('bill_number')
      .then((billNumber) => {
        let billNumberFiltered = billNumber.filter((number) => {
          return number.bill_number === bill.bill_number
        })
        if (billNumberFiltered.length === 0) {
          return knex('bills').insert(bill)
        } else if (billNumberFiltered.length > 0) {
          return knex('bills').where(billNumberFiltered[0], bill.bill_number).update(bill)
        }
        console.log(billNumberFiltered)
      })
      .catch(function (err) {
        console.error(err)
      })
  })
}
