import { db } from '../database/index.js';

export const createCartsTable = async () => {
    try {
        await db.schema.createTableIfNotExists('carts', (table) => {
            table.increments('id').primary();
            table
                .integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE');
            table.decimal('total', 10, 2).notNullable();
            table.timestamp('created_at').defaultTo(db.fn.now());
            table.timestamp('updated_at').defaultTo(db.fn.now());
        });

        console.log('CARTS table created successfully');
    } catch (error) {
        console.error('Error creating CARTS table:', error);
    } finally {
        await db.destroy();
    }
};
