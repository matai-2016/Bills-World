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

test('getBills gets all bills', function (t) {
  // One for each letter of the alphabet!
  var expected = 2
  return db.getBills(t.context.db)
    .then(function (result) {
      var actual = result.length
      t.is(actual, expected)
    })
})

test('getBill gets a single bill', function (t) {
  var expected = 'Point England Development Enabling Bill'
  return db.getBill('223-1', t.context.db)
    .then(function (result) {
      var actual = result[0].title
      t.is(actual, expected)
    })
})
