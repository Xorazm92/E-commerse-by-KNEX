/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('orders', (table) => {
      table.increments('id').primary();
      table.integer('userId').unsigned().references('id').inTable('users').onDelete('SET NULL');
      table.enum('status', ['pending', 'processing', 'completed', 'cancelled']).defaultTo('pending');
      table.decimal('totalAmount', 10, 2).notNullable();
      table.string('shippingAddress').notNullable();
      table.string('paymentMethod').notNullable();
      table.timestamps(true, true);
    })
    .createTable('order_items', (table) => {
      table.increments('id').primary();
      table.integer('orderId').unsigned().references('id').inTable('orders').onDelete('CASCADE');
      table.integer('productId').unsigned().references('id').inTable('products').onDelete('SET NULL');
      table.integer('quantity').notNullable();
      table.decimal('price', 10, 2).notNullable();
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable('order_items')
    .dropTable('orders');
};
