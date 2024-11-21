import knex from 'knex';
import { logger } from '../utils/logger.js';
import knex from "../database/index.js";

export const createCategoriesTable = async () => {
    try {

        await db.schema.createTableIfNotExists('categories', (table) => {
            table.increments('id').primary(); 
            table.string('name').notNullable(); 
            table.string('description'); 
            table.string('tag').notNullable(); 
            table.timestamp('create_at').defaultTo(db.fn.now()); 
            table.timestamp('update_at').defaultTo(db.fn.now()); 
        });

        logger.info('Categories table created successfully');
    } catch (error) {
        logger.error(error);
    } finally {
        await db.destroy(); 
    }
};