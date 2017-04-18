const config = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = {
  saveComment,
  getComments,
  getAllComments,
  editComment,
  deleteComment
}

function saveComment (user_id, billNumber, comment, username, date) {
  return knex('comments')
    .insert({
      user_id: user_id,
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

function editComment (user_id, comment_id, comment) {
  return knex('comments')
    .where('comments.user_id', user_id)
    .where('comments.id', comment_id)
    .update({
      comment: comment
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
}

function deleteComment (user_id, comment_id) {
  return knex('comments')
    .where('user_id', user_id)
    .where('id', comment_id)
    .del()
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
