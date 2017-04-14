const config = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = {
  getUsers,
  createUser,
  exists,
  getByClientId
}

function getUsers () {
  return knex('users')
  .select()
}

function createUser (client_id, username, email, testDb) {
  const connection = testDb || knex
  return connection('users')
    .insert({
      client_id: client_id,
      username: username,
      email: email,
    })
}

function exists (client_id, testDb) {
  const connection = testDb || knex
  return connection('users')
    .count('id as n')
    .where('client_id', client_id)
    .then(count => {
      return count[0].n > 0
    })
}

function getByClientId (client_id, testDb) {
  const connection = testDb || knex
  return connection('users')
    .select()
    .where('client_id', client_id)
}
