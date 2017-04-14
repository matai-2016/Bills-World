const config = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = {
  getBill
}

function getBill (id) {
  return knex('bills')
  .where('bill_number', id)
  .select()
}
