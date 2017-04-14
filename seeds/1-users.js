
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, client_id: '123456', username: 'user1', email: 'user1@gmail.com'},
        {id: 2, client_id: '789101', username: 'user2', email: 'user2@gmail.com'}
      ])
    })
}
