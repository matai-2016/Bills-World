const config = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = {
  getReplies,
  saveReply,
}

function getReplies (billNumber) {
  return knex('replies')
    .where('bill_number', billNumber)
    .select()
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
}

function saveReply (user_id, billNumber, reply, username, date, parentId) {
  console.log(parentId)
  return knex('replies')
    .insert({
      user_id: user_id,
      bill_number: billNumber,
      reply: reply,
      username: username,
      date: date,
      parent_id: parentId
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
}
