const config = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = {
  saveComment,
  getComments
}

function saveComment (clientID, billNumber, comment, username, date) {
  return knex('comments')
    .insert({
      date: date,
      bill_number: billNumber,
      client_id: clientID,
      username: username,
      comment: comment
    })
}

function getComments (billNumber) {
  return knex('comments')
  console.log(billNumber)
    .where('bill_number', billNumber)
    .select()
}
