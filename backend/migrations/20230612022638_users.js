/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary(); // id
        table.string("first_name").notNullable(); // varchar
        table.string("last_name").notNullable(); // varchar
        table.string("email").notNullable(); // varchar
        table.string("password").notNullable(); // varchar
      })  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');  
};
