const config = require('../../knexfile')[process.env.NODE_ENV || 'development']
const knex = require('knex')(config)

module.exports = {
  getVotes,
  getVotesByClientIdAndBillId,
  saveUserVote,
  updateUserVote
}

function getVotes () {
  return knex('votes')
  .select()
}

function getVotesByClientIdAndBillId (billNumber, clientID) {
  return knex('votes')
  .join('users', 'votes.user_id', '=', 'users.id')
  .join('bills', 'bills.bill_number', '=', 'votes.bill_number')
  .where('users.client_id', clientID)
  .where('bills.bill_number', billNumber)
  .select()
}

function saveUserVote (userID, billNumber, voteFor, voteAgainst) {
  return knex('votes')
    .insert({
      user_ID: userID,
      bill_number: billNumber,
      voted_for: voteFor,
      voted_against: voteAgainst
    })
    .select()
}

function updateUserVote (userID, billNumber, voteFor, voteAgainst) {
  return knex('votes')
    .where({
      user_id: userID,
      bill_number: billNumber
    })
    .update({
      user_ID: userID,
      bill_number: billNumber,
      voted_for: voteFor,
      voted_against: voteAgainst
    })
}
