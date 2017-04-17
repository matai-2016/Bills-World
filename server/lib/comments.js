const config = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = {
  saveComment,
  getComments
}

function saveComment (user_id, billNumber, comment, username, date) {
  return knex('comments')
    .insert({
      user_id: clientID,
      bill_number: billNumber,
      comment: comment,
      username: username,
      date: date
    })
}

function getComments (billNumber) {
  return knex('comments')
    .where('bill_number', billNumber)
    .select()
}
