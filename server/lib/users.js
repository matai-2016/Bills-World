const config = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = {
  getUsers,
  createUser,
  exists,
  getByUserId
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

function createUser (userId, username, email, testDb) {
  const connection = testDb || knex
  return connection('users')
    .insert({
      user_id: userId,
      username: username,
      email: email
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
}

function exists (userId, testDb) {
  const connection = testDb || knex
  return connection('users')
    .count('id as n')
    .where('user_id', userId)
    .then(count => {
      return count[0].n > 0
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
}

function getByUserId (userId, testDb) {
  const connection = testDb || knex
  return connection('users')
    .where('user_id', userId)
    .select()
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
}
