const config = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = {
  getUsers
}

function getUsers () {
  return knex('users')
  .select('id', 'username', 'email', 'status')
}
