/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("cart", (table) => {
    table.increments("id").primary(); // Birlamchi kalit
    table.integer("user_id").unsigned().notNullable(); // Foydalanuvchi ID
    table.decimal("total", 10, 2).notNullable().defaultTo(0.00); // Umumiy summa
    table.timestamps(true, true); // Vaqt muhri
  });
}

export function down(knex) {
  return knex.schema.dropTable("cart");
}
