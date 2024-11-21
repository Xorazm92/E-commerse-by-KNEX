/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('orders', (table) => {
      table.increments('id').primary();
      table.integer('user_id').notNullable();
      table.integer('cart_id').notNullable(); 
      table.timestamps(true, true); 
    });
  }
  
  export function down(knex) {
    return knex.schema.dropTable('orders');
  }
  
