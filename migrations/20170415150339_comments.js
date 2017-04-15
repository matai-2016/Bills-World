exports.up = knex => knex.schema.createTable('comments', table => {
  table.increments('id').primary()
  table.integer('parent_id')
  table.integer('client_id').references('users.client_id')
  table.string('bill_number').references('bills.bill_number')
  table.text('comment')
})

exports.down = knex => knex.schema.dropTable('comments')
