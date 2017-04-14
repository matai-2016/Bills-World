const config = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = {
  getBill
}

function getBill (bill_number) {
  return knex('bills')
  .where('bill_number', bill_number)
  .select()
}
