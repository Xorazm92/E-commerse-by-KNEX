/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('orders', (table) => {
      table.increments('id').primary();  // auto-incrementing ID
      table.integer('user_id').notNullable();  // Foreign key for user
      table.integer('cart_id').notNullable();  // Foreign key for cart
      table.timestamps(true, true);  // created_at and updated_at with default values
    });
  }
  
  export function down(knex) {
    return knex.schema.dropTable('orders');
  }
  
