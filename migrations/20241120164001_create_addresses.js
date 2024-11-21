/**
 * Ma'lumotlar bazasi o'zgarishlarini amalga oshirish
 * @param {import('knex')} knex 
 */
export const up = async function () {
    try {
        await db.schema.createTable('addresses', (table) => {
            table.increments('id').primary(); 
            table.integer('user_id').references('id').inTable('users').onDelete('CASCADE'); // Foydalanuvchi ID
            table.string('title').notNullable(); // Manzil nomi
            table.timestamp('create_at').defaultTo(db.fn.now()); // Yaratilgan vaqt
            table.string('address_line_1'); // Manzilning 1-qatori
            table.string('address_line_2'); // Manzilning 2-qatori
            table.string('country').notNullable(); // Mamlakat
            table.string('city').notNullable(); // Shahar
            table.string('postal_code'); // Pochta kodi
            table.string('phone_number'); // Telefon raqami
            table.string('landmark'); // Belgilar
        });

        console.log('Addresses table created successfully');
    } catch (error) {
        console.error('Error creating addresses table:', error.message);
    }
};

/**
 * O'zgarishlarni bekor qilish
 * @param {import('knex')} knex 
 */
export const down = async function () {
    try {
        await db.schema.dropTableIfExists('addresses');
        console.log('Addresses table dropped successfully');
    } catch (error) {
        console.error('Error dropping addresses table:', error.message);
    }
};
