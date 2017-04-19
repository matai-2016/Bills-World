var environment = process.env.NODE_ENV || 'development'
var config = require('../../knexfile')[environment]
var connection = require('knex')(config)

module.exports = {
  getBills: getBills,
  getBill: getBill,
  getUsers: getUsers,
  getByUserId: getByUserId,
  createUser: createUser,
  getVotes: getVotes,
  getVotesByUserIdAndBillId: getVotesByUserIdAndBillId,
  getExistingVote: getExistingVote,
  saveUserVote: saveUserVote,
  updateUserVote: updateUserVote
}

function getBills (testDb) {
  const db = testDb || connection
  return db('bills').select()
}

function getBill (billNumber, testDb) {
  const db = testDb || connection
  return db('bills').where('bill_number', billNumber)
}

function getUsers (testDb) {
  const db = testDb || connection
  return db('users').select()
}

function getByUserId (userId, testDb) {
  const db = testDb || connection
  return db('users').where('user_id', userId)
}

function getUserById (id, testDb) {
  const db = testDb || connection
  return db('users').where('id', id)
}

function createUser (userId, username, email, testDb) {
  const db = testDb || connection
  return db('users')
    .insert({
      user_id: userId,
      username: username,
      email: email
    })
    .then(function (resp) {
      var id = resp[0]
      return getUserById(id, testDb)
    })
}

function getVotes (testDb) {
  const db = testDb || connection
  return db('votes').select()
}

function getVotesByUserIdAndBillId (billNumber, userId, testDb) {
  const db = testDb || connection
  return db('votes')
  .join('users', 'votes.user_id', '=', 'users.id')
  .join('bills', 'bills.bill_number', '=', 'votes.bill_number')
  .where('users.user_id', userId)
  .where('bills.bill_number', billNumber)
  .select()
}

function getExistingVote (billNumber, user_id, testDb) {
  const db = testDb || connection
  return db('votes')
  .join('users', 'users.id', 'votes.user_id')
  .select('votes.id', 'votes.voted_for', 'votes.voted_against')
  .where('users.user_id', user_id)
  .where('votes.bill_number', billNumber)
}

function saveUserVote (user_id, billNumber, voteFor, voteAgainst, testDb) {
  const db = testDb || connection
  return db('votes')
    .insert({
      user_id: user_id,
      bill_number: billNumber,
      voted_for: voteFor,
      voted_against: voteAgainst
    })
    .then(() => {
      return db('votes')
      .where({
        user_id: user_id,
        bill_number: billNumber
      })
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

function updateUserVote (existingVote, voteType, testDb) {
  const db = testDb || connection
  const voteResult = getVoteResult(existingVote, voteType)
  return db('votes')
    .where('id', existingVote.id)
    .update(voteResult)
    .then(() => {
      return db('votes')
      .where('id', existingVote.id)
    })
}
