exports.up = knex => knex.schema.createTable('users', table => {
  table.increments('id').primary()
  table.string('client_id').notNullable().unique()
  table.string('username').notNullable().unique()
  table.string('email')
})

exports.down = knex => knex.schema.dropTable('users')
