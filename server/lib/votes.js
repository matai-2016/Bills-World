const config = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = {
  getVotes
}

function getVotes () {
  return knex('votes')
  .select()
}
