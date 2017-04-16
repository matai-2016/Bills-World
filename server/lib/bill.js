const config = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = {
  getBill
}

function getBill (billNumber) {
  return knex('bills')
  .where('bill_number', billNumber)
  .select()
  .catch((err) => {
    if (err) {
      console.error(err.message)
    }
  })
}
