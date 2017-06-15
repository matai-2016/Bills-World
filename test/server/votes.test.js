var test = require('ava')
var knex = require('knex')

var config = require('../../knexfile').test
var db = require('./db')

// Create a separate in-memory database before each test.
// In our tests, we can get at the database as `t.context.db`.
test.beforeEach(function (t) {
  t.context.db = knex(config)
  return t.context.db.migrate.latest()
    .then(function () {
      return t.context.db.seed.run()
    })
})

// Destroy the database connection after each test.
test.afterEach(function (t) {
  t.context.db.destroy()
})

test('getVotes gets all votes', function (t) {
  // One for each letter of the alphabet!
  var expected = 3
  return db.getVotes(t.context.db)
    .then(function (result) {
      var actual = result.length
      t.is(actual, expected)
    })
})

test('getVotesByUserIdAndBillId gets a single vote for a user by userId and Bill Number', function (t) {
  var expected = 'user1'
  return db.getVotesByUserIdAndBillId('223-1', '123456', t.context.db)
    .then(function (result) {
      var actual = result[0].username
      t.is(actual, expected)
    })
})

test('getExistingVote gets the vote ID of a single user', function (t) {
  var expected = 2
  return db.getExistingVote('223-1', '123456', t.context.db)
    .then(function (result) {
      var actual = result[0].id
      t.is(actual, expected)
    })
})

test('saveUserVote saves a vote for a single user', function (t) {
  var expected = 4
  return db.saveUserVote('1', '231-1', true, false, t.context.db)
    .then(function (result) {
      var actual = result[0].id
      t.is(actual, expected)
    })
})

test('updateUserVote updates a previously saved vote', function (t) {
  var existingVote = {id: 3, user_id: 1, bill_number: '253-1', voted_for: 0, voted_against: 1}
  var expected = {id: 3, user_id: 1, bill_number: '253-1', voted_for: 1, voted_against: 0}
  return db.updateUserVote(existingVote, 'vote-for', t.context.db)
    .then(function (result) {
      var actual = result[0]
      t.deepEqual(actual, expected)
    })
})
