
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'james.luke.mead', email: 'james.luke.mead@gmail.com', status: true},
        {id: 2, username: 'alex.blair', email: 'alex-blair@gmail.com', status: true}
      ]);
    });
};
