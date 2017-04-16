exports.up = knex => knex.schema.createTable('bills', table => {
  table.increments('id').primary()
  table.string('title').notNullable()
  table.date('introduction_date')
  table.string('member_in_charge')
  table.string('type')
  table.string('bill_number').notNullable().unique()
  table.text('summary')
  table.boolean('archive').defaultTo(false)
})

exports.down = knex => knex.schema.dropTable('bills')
