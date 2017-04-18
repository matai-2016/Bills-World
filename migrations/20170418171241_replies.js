exports.up = knex => knex.schema.createTable('replies', table => {
  table.increments('id').primary()
  table.integer('parent_id').references('comments.id')
  table.string('date')
  table.string('bill_number').references('bills.bill_number')
  table.string('user_id').references('users.user_id')
  table.string('username').references('users.username')
  table.text('reply')
})

exports.down = knex => knex.schema.dropTable('replies')
