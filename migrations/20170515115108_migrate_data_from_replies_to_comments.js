exports.up = function(knex, Promise) {
  return knex.schema.raw('INSERT INTO comments (date, bill_number, user_id, username, comment, parent_id, edited, deleted) SELECT date, bill_number, user_id, username, reply, parent_id, NULL, NULL FROM replies')
}

exports.down = function(knex, Promise) {
}
