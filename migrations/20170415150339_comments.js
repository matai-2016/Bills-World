exports.up = knex => knex.schema.createTable('comments', table => {
  table.increments('id').primary()
  table.integer('parent_id')
  table.string('date')
  table.string('bill_number').references('bills.bill_number')
  table.string('user_id').references('users.user_id')
  table.string('username').references('users.username')
  table.boolean('edit').defaultTo(false)
  table.text('comment')
})

exports.down = knex => knex.schema.dropTable('comments')
