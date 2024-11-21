/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("cart_item", (table) => {
      table.increments("id").primary();
      table.integer("cart_id").unsigned().notNullable();
      table.integer("product_id").unsigned().notNullable();
      table.decimal("quantity").notNullable().defaultTo(0.00);
      table.timestamps(true, true); 
    });
  }
  
  export function down(knex) {
    return knex.schema.dropTable("cart_item");
  }
  