import { db } from '../database/index.js';

export const createCartItemsTable = async () => {
    try {
        await db.schema.createTableIfNotExists('cart_items', (table) => {
            table.increments('id').primary();
            table.integer('cart_id').unsigned().notNullable().references('id').inTable('carts').onDelete('CASCADE');
            table.integer('product_id').unsigned().notNullable().references('id').inTable('products').onDelete('CASCADE');
            table.integer('quantity').notNullable();
            table.timestamp('created_at').defaultTo(db.fn.now());
            table.timestamp('updated_at').defaultTo(db.fn.now());
        });

        console.log('CART_ITEMS table created successfully');
    } catch (error) {
        console.error('Error creating CART_ITEMS table:', error);
    } finally {
        await db.destroy();
    }
};

