import knex from 'knex';
import { logger } from '../utils/logger.js';
import knex from "../database/index.js";



export const createUserTable = async () => {
    try {
        await db.schema.createTableIfNotExists('users', (table) => {
            table.increments('id').primary(); 
            table.string('name').notNullable(); 
            table.string('email').unique().notNullable(); 
            table.string('password').notNullable(); 
            table.enu('role', ['user', 'admin', 'manager']).defaultTo('user'); 
            table.string('avatar'); 
            table.string('username').unique().notNullable();  
            table.date('birth_of_date');
            table.string('phone_number').unique().notNullable(); 
            table.boolean('is_active').defaultTo(false); 
            table.timestamp('create_at').defaultTo(db.fn.now()); 
            table.timestamp('update_at').defaultTo(db.fn.now());  
        });

        logger.info('Users table created successfully');
    } catch (error) {
        logger.error(error);
    } finally {
        await db.destroy(); 
    }
};