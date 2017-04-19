const config = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = {
  getReplies,
  saveReply,
  deleteReply,
  editReply
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

function deleteReply (user_id, reply_id) {
  return knex('replies')
    .where('user_id', user_id)
    .where('id', reply_id)
    .del()
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
}

function editReply (user_id, reply_id, reply) {
  return knex('replies')
    .where('user_id', user_id)
    .where('id', reply_id)
    .update({
      reply: reply
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
}
