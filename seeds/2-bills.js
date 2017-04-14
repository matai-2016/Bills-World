
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bills').del()
    .then(function () {
      // Inserts seed entries
      return knex('bills').insert([
        {id: 1, bill_number: '223-1', title: 'Point England Development Enabling Bill', summary: 'The purpose of the bill is to enable housing development on 11.69 hectares of land on the Point England Recreation Reserve in Tāmaki in east Auckland.', type: 'Government', member_in_charge: 'Hon Dr Nick Smith', introduction_date: '07 Dec 2016', submissions_due: '31 Jan 2017', stage: '2'},
        {id: 2, bill_number: '224-1', title: 'Test Bill - 2', summary: 'The purpose of the bill is to enable housing development on 11.69 hectares of land on the Point England Recreation Reserve in Tāmaki in east Auckland.', type: 'Government', member_in_charge: 'Hon Dr Nick Smith', introduction_date: '07 Dec 2016', submissions_due: '31 Jan 2017', stage: '2'}
      ]);
    });
};
