/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.enum('role', ['user', 'admin', 'manager', 'superAdmin']).defaultTo('user');
    table.boolean('isVerified').defaultTo(false);
    table.string('verificationToken');
    table.timestamp('verificationTokenExpires');
    table.string('resetPasswordToken');
    table.timestamp('resetPasswordTokenExpires');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
