exports.up = knex => knex.schema.createTable('users', table => {
  table.increments('id').primary()
  table.string('username').notNullable().unique()
  table.string('email').notNullable().unique()
  table.boolean('status').defaultTo(false)
})

exports.down = knex => knex.schema.dropTable('users')
