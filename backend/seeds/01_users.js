/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {first_name: 'Sam', last_name:'Test', email: 'sam@test.com', password: '1234512345'},
    {first_name: 'Tester', last_name:'Test', email: 'tester@test.com', password: 'abcdefg'},
  ]);
};
