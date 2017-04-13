
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('votes').del()
    .then(function () {
      // Inserts seed entries
      return knex('votes').insert([
        {id: 1, user_id: 2, bill_id: 1, voted_for: true, voted_against: false},
        {id: 2, user_id: 1, bill_id: 1, voted_for: true, voted_against: false},
        {id: 3, user_id: 1, bill_id: 2, voted_for: false, voted_against: true}
      ]);
    });
};
