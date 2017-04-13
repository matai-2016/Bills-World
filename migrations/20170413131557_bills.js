exports.up = knex => knex.schema.createTable('bills', table => {
  table.increments('id').primary()
  table.string('bill_number').notNullable()
  table.string('title').notNullable()
  table.text('summary')
  table.string('type')
  table.string('member_in_charge')
  table.date('introduction_date')
  table.date('submissions_due')
  table.string('stage')
})

exports.down = knex => knex.schema.dropTable('bills')
