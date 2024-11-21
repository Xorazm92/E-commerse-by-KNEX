import { db } from '../database/index.js';

export const createOrdersTable = async () => {
    try {
        await db.schema.createTableIfNotExists('orders', (table) => {
            table.increments('id').primary();
            table
                .integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE');
            table
                .integer('cart_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('carts')
                .onDelete('CASCADE'); 
            table.timestamp('created_at').defaultTo(db.fn.now());
            table.timestamp('updated_at').defaultTo(db.fn.now());
        });

        console.log('ORDERS table created successfully');
    } catch (error) {
        console.error('Error creating ORDERS table:', error);
    } finally {
        await db.destroy();
    }
};
