import { logger } from '../utils/logger.js';
import {db} from "../database/index.js";

export const createWishlistTable = async () => {
    try {

        await db.schema.createTableIfNotExists('wishlist', (table) => {
            table.increments('id').primary(); 
            table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE'); 
            table.integer('product_id').notNullable().references('id').inTable('products').onDelete('CASCADE'); 
            table.timestamp('create_at').defaultTo(db.fn.now()); 
            table.timestamp('update_at').defaultTo(db.fn.now()); 
        });

        logger.info('Reviews table created successfully');
    } catch (error) {
        logger.error(error);
    } finally {
        await db.destroy(); 
    }
};