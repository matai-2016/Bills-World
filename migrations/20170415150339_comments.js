exports.up = knex => knex.schema.createTable('comments', table => {
  table.increments('id').primary()
  table.integer('parent_id')
  table.string('date')
  table.string('bill_number').references('bills.bill_number')
  table.string('client_id').references('users.client_id')
  table.string('username').references('users.username')
  table.text('comment')
})

exports.down = knex => knex.schema.dropTable('comments')
