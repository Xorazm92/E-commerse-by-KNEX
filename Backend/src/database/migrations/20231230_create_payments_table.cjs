/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('payments', (table) => {
    table.increments('id').primary();
    table.integer('orderId').unsigned().references('id').inTable('orders').onDelete('CASCADE');
    table.string('transactionId').notNullable();
    table.decimal('amount', 10, 2).notNullable();
    table.enum('status', ['pending', 'completed', 'failed']).defaultTo('pending');
    table.string('paymentMethod').notNullable();
    table.jsonb('paymentDetails');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('payments');
};
