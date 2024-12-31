/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('categories', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description');
    table.string('image');
    table.boolean('isActive').defaultTo(true);
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('categories');
}
