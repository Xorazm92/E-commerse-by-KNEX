/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable('carts', (table) => {
      table.increments('id').primary();
      table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.timestamps(true, true);
    })
    .createTable('cart_items', (table) => {
      table.increments('id').primary();
      table.integer('cartId').unsigned().references('id').inTable('carts').onDelete('CASCADE');
      table.integer('productId').unsigned().references('id').inTable('products').onDelete('CASCADE');
      table.integer('quantity').notNullable().defaultTo(1);
      table.timestamps(true, true);
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTable('cart_items')
    .dropTable('carts');
}
