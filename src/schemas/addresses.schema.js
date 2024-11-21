// import knex from 'knex';
import { logger } from '../utils/logger.js';
import knex from "../database/index.js";


export const createAddressesTable = async () => {
    try {

        await db.schema.createTableIfNotExists('addresses', (table) => {
            table.increments('id').primary(); 
            table.integer('user_id').references('id').inTable('users'); 
            table.string('title').notNullable(); 
            table.timestamp('create_at').defaultTo(db.fn.now()); 
            table.string('address_line_1');
            table.string('address_line_2'); 
            table.string('country').notNullable();
            table.string('city').notNullable(); 
            table.string('postal_code'); 
            table.string('phone_number');
            table.string('landmark'); 
        });

        logger.info('Addresses table created successfully');
    } catch (error) {
        logger.error(error);
    } finally {
        await db.destroy(); 
    }
};