const config = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = {
  getVotes,
  getVotesByUserIdAndBillId,
  saveUserVote,
  updateUserVote,
  getExistingVote
}

function getVotes () {
  return knex('votes')
  .select()
  .catch((err) => {
    if (err) {
      console.error(err.message)
    }
  })
}

function getVotesByUserIdAndBillId (billNumber, user_id) {
  return knex('votes')
  .join('users', 'votes.user_id', '=', 'users.id')
  .join('bills', 'bills.bill_number', '=', 'votes.bill_number')
  .where('users.user_id', user_id)
  .where('bills.bill_number', billNumber)
  .select()
  .catch((err) => {
    if (err) {
      console.error(err.message)
    }
  })
}

function getExistingVote (billNumber, user_id) {
  return knex('votes')
  .join('users', 'users.id', 'votes.user_id')
  .select('votes.id', 'votes.voted_for', 'votes.voted_against')
  .where('users.user_id', user_id)
  .where('votes.bill_number', billNumber)
}

function saveUserVote (user_id, billNumber, voteFor, voteAgainst) {
  return knex('votes')
    .insert({
      user_id: user_id,
      bill_number: billNumber,
      voted_for: voteFor,
      voted_against: voteAgainst
    })
    .then(() => {
      return knex('votes')
      .where({
        user_id: user_id,
        bill_number: billNumber
      })
    })
}

function updateUserVote (existingVote, voteType) {
  const voteResult = getVoteResult(existingVote, voteType)
  return knex('votes')
    .where('id', existingVote.id)
    .update(voteResult)
    .then(() => {
      return knex('votes')
      .where('id', existingVote.id)
    })
    .catch((err) => {
      if (err) {
        console.error(err.message)
      }
    })
}

function getVoteResult (vote, type) {
  switch (type) {
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
