
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('votes').del()
    .then(function () {
      // Inserts seed entries
      return knex('votes').insert([
        {id: 1, user_id: 2, bill_id: 1, voted_for: true, voted_against: false}
      ])
    })
}
