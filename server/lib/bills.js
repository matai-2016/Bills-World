const config = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = {
  getBills
}

function getBills () {
  return knex('bills')
  .select()
  .catch((err) => {
    if (err) {
      console.error(err.message)
    }
  })
}
