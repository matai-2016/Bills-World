exports.up = knex => knex.schema.createTable('votes', table => {
  table.increments('id').primary()
  table.integer('user_id').references('users.id')
  table.integer('bill_id').references('bills.id')
  table.boolean('voted_for')
  table.boolean('voted_against')
})

exports.down = knex => knex.schema.dropTable('votes')
