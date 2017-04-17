const config = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = {
  getCommentVotes,
  getCommentVotesByUserIdAndBillId,
  saveUserCommentVote,
  updateUserCommentVote,
  getExistingCommentVote
}

function getCommentVotes () {
  return knex('comment_votes')
  .select()
  .catch((err) => {
    if (err) {
      console.error(err.message)
    }
  })
}

function getCommentVotesByUserIdAndBillId (billNumber, user_id) {
  return knex('comment_votes')
  .join('users', 'comment_votes.user_id', '=', 'users.id')
  .join('bills', 'bills.bill_number', '=', 'comment_votes.bill_number')
  .where('users.user_id', user_id)
  .where('bills.bill_number', billNumber)
  .select()
  .catch((err) => {
    if (err) {
      console.error(err.message)
    }
  })
}

function getExistingCommentVote (billNumber, user_id) {
  return knex('comment_votes')
  .join('users', 'users.id', 'comment_votes.user_id')
  .select('comment_votes.id', 'comment_votes.voted_for', 'comment_votes.voted_against')
  .where('users.user_id', user_id)
  .where('comment_votes.bill_number', billNumber)
}

function saveUserCommentVote (user_id, billNumber, voteFor, voteAgainst) {
  return knex('comment_votes')
    .insert({
      user_id: user_id,
      bill_number: billNumber,
      voted_for: voteFor,
      voted_against: voteAgainst
    })
    .then(() => {
      return knex('comment_votes')
      .where({
        user_id: user_id,
        bill_number: billNumber
      })
    })
}

function updateUserCommentVote (existingVote, voteType) {
  const commentVoteResult = getCommentVoteResult(existingVote, voteType)
  return knex('comment_votes')
    .where('id', existingVote.id)
    .update(commentVoteResult)
    .then(() => {
      return knex('comment_votes')
      .where('id', existingVote.id)
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
}

function getCommentVoteResult(vote, type) {
  switch(type) {
    case 'vote-for':
      return {
        voted_for: !vote.voted_for,
        voted_against: false
      }
    case 'vote-against':
      return {
        voted_for: false,
        voted_against: !vote.voted_against
      }
  }
}
