exports.up = knex => knex.schema.createTable('comment_votes', table => {
  table.increments('id').primary()
  table.integer('user_id').references('users.id')
  table.integer('comment_id').references('comments.id')
  table.string('bill_number').references('bills.bill_number')
  table.boolean('voted_for')
  table.boolean('voted_against')
})

exports.down = knex => knex.schema.dropTable('comment_votes')
