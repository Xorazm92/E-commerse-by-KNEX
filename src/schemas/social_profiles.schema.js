import { db } from '../database/index.js';

export const createSocialProfilesTable = async () => {
    try {
        await db.schema.createTableIfNotExists('social_profiles', (table) => {
            table.increments('id').primary(); 
            table
                .integer('user_id') 
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users') 
                .onDelete('CASCADE'); 
            table.string('platform').notNullable().trim(); 
            table.string('platform_user').notNullable().trim();
            table.timestamp('created_at').defaultTo(db.fn.now()); 
            table.timestamp('updated_at').defaultTo(db.fn.now()); 
        });

        console.log('SOCIAL_PROFILES table created successfully');
    } catch (error) {
        console.error('Error creating SOCIAL_PROFILES table:', error);
    } finally {
        await db.destroy(); 
    }
};
