exports.up = function(knex, Promise) {
  return knex.schema.table('votes', function (table) {
    table.integer('vote').defaultTo(0)
    table.dropColumn('voted_for')
    table.dropColumn('voted_against')
  })
}

exports.down = knex => knex.schema.dropTable('votes_restructure_1')
