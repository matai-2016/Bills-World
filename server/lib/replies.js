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

function saveReply (userId, billNumber, reply, username, date, parentId) {
  return knex('replies')
    .insert({
      user_id: userId,
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

function deleteReply (userId, replyId) {
  return knex('replies')
    .where('user_id', userId)
    .where('id', replyId)
    .del()
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
}

function editReply (userId, replyId, reply) {
  return knex('replies')
    .where('user_id', userId)
    .where('id', replyId)
    .update({
      reply: reply
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
}
