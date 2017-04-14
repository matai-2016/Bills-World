exports.up = knex => knex.schema.createTable('votes', table => {
  table.increments('id').primary()
  table.integer('user_id').references('users.id')
  table.string('bill_number').references('bills.bill_number')
  table.boolean('voted_for')
  table.boolean('voted_against')
})

exports.down = knex => knex.schema.dropTable('votes')
