exports.up = function (knex, Promise) {
  return knex.schema.table('comments', function (table) {
    table.integer('parent_id').references('comments.id')
    table.string('edited')
    table.string('deleted')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('comments', function (table) {
    table.dropColumn('parent_id')
    table.dropColumn('edited')
    table.dropColumn('deleted')
  })
}
