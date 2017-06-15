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

test('getUsers gets all users', function (t) {
  // One for each letter of the alphabet!
  var expected = 2
  return db.getUsers(t.context.db)
    .then(function (result) {
      var actual = result.length
      t.is(actual, expected)
    })
})

test('getByUserId gets a single user', function (t) {
  var expected = 'user1'
  return db.getByUserId('123456', t.context.db)
    .then(function (result) {
      var actual = result[0].username
      t.is(actual, expected)
    })
})

test('createUser creates a single user', function (t) {
  var expected = 'user3@gmail.com'
  return db.createUser('565656', 'user3', 'user3@gmail.com', t.context.db)
    .then(function (result) {
      var actual = result[0].email
      t.is(actual, expected)
    })
})
