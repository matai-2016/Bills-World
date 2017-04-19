
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('bills').del()
    .then(function () {
      // Inserts seed entries
      return knex('bills').insert([
        {id: 1, title: 'Point England Development Enabling Bill', introduction_date: '07Dec2016', member_in_charge: 'Hon Dr Nick Smith', type: 'Government', bill_number: '223-1', summary: 'The purpose of the bill is to enable housing development on 11.69 hectares of land on the Point England Recreation Reserve in Tāmaki in east Auckland.', archive: false},
        {id: 2, title: 'Consumers Right to Know Bill', introduction_date: '08Dec2016', member_in_charge: 'Steffan Browning', type: 'Member\'s', bill_number: '231-1', summary: 'The purpose of this bill is to enshrine in law consumers\' right to know the country from which the food they are purchasing originated so that they can make informed purchasing decisions.', archive: false}
      ])
    })
}
