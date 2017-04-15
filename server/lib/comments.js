const config = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = {
  saveComment,
  getComments
}

function saveComment (clientID, billNumber, comment) {
  return knex('comments')
    .insert({
      client_id: clientID,
      bill_number: billNumber,
      comment: comment
    })
}

function getComments (billNumber) {
  return knex('comments')
    .where('bill_number', billNumber)
    .select()
}
