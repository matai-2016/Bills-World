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
  .catch((err) => {
    if (err) {
      console.error(err.message)
    }
  })
}

function createUser (clientId, username, email, testDb) {
  const connection = testDb || knex
  return connection('users')
    .insert({
      client_id: clientId,
      username: username,
      email: email
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
}

function exists (clientId, testDb) {
  const connection = testDb || knex
  return connection('users')
    .count('id as n')
    .where('client_id', clientId)
    .then(count => {
      return count[0].n > 0
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
}

function getByClientId (clientId, testDb) {
  const connection = testDb || knex
  return connection('users')
    .where('client_id', clientId)
    .select()
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
}
