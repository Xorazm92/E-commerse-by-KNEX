/**
 * Ma'lumotlar bazasi o'zgarishlarini amalga oshirish
 * @param {import('knex')} knex 
 */
export async function up(knex) {
    try {
        await knex.schema.createTable('users', (table) => {
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
            table.timestamp('create_at').defaultTo(knex.fn.now()); 
            table.timestamp('update_at').defaultTo(knex.fn.now()); 
        });

        console.log('Users table created successfully');
    } catch (error) {
        console.error('Error creating users table:', error.message);
    }
}

/**
 * O'zgarishlarni bekor qilish
 * @param {import('knex')} knex 
 */
export async function down(knex) {
    try {
        await knex.schema.dropTableIfExists('users');
        console.log('Users table dropped successfully');
    } catch (error) {
        console.error('Error dropping users table:', error.message);
    }
}
