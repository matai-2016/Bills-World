exports.up = knex => knex.schema.table('comments', table => {
    table.integer('parent_id').references('comments.id')
    table.string('edited')
    table.string('deleted')
  })
}

exports.down = knex => knex.schema.table('comments', table => {
      table.dropColumn('parent_id')
      table.dropColumn('edited')
      table.dropColumn('deleted')
  })
}
