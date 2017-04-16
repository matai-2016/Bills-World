const config = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = {
  saveComment,
  getComments,
  getAllComments
}

function saveComment (clientID, billNumber, comment, username, date) {
  return knex('comments')
    .insert({
      client_id: clientID,
      bill_number: billNumber,
      comment: comment,
      username: username,
      date: date
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
}

function getComments (billNumber) {
  return knex('comments')
    .where('bill_number', billNumber)
    .select()
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
}

function getAllComments () {
  return knex('comments')
    .select()
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
}
