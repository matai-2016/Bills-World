
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, client_id: '123123123', username: 'james.luke.mead', email: 'james.luke.mead@gmail.com'},
        {id: 2, client_id: '444434324324', username: 'alex.blair', email: 'alex-blair@gmail.com'}
      ]);
    });
};
