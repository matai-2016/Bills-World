const config = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = {
  saveComment,
  saveReply,
  getComments,
  getAllComments,
  editComment,
  deleteComment
}

function saveComment (userId, billNumber, comment, username, date) {
  return knex('comments')
    .insert({
      user_id: userId,
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

function saveReply (userId, billNumber, comment, username, date, parentId) {
  return knex('comments')
    .insert({
      user_id: userId,
      bill_number: billNumber,
      comment: comment,
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

function editComment (userId, commentId, comment) {
  return knex('comments')
    .where('user_id', userId)
    .where('id', commentId)
    .update({
      comment: comment
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
}

function deleteComment (userId, commentId, deleteDate) {
  return knex('comments')
    .where('user_id', userId)
    .where('id', commentId)
    .update({
      deleted: deleteDate
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
