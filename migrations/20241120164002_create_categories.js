/**
 * Ma'lumotlar bazasi o'zgarishlarini amalga oshirish
 * @param {import('knex')} knex 
 */
export const up = async function () {
    try {
        await db.schema.createTable('categories', (table) => {
            table.increments('id').primary(); // Avtomatik ID
            table.string('name').notNullable(); // Kategoriya nomi
            table.string('description'); // Tavsif
            table.string('tag').notNullable(); // Teg
            table.timestamp('create_at').defaultTo(db.fn.now()); // Yaratilgan vaqt
            table.timestamp('update_at').defaultTo(db.fn.now()); // Yangilangan vaqt
        });

        console.log('Categories table created successfully');
    } catch (error) {
        console.error('Error creating categories table:', error.message);
    }
};

/**
 * O'zgarishlarni bekor qilish
 * @param {import('knex')} knex 
 */
export const down = async function () {
    try {
        await db.schema.dropTableIfExists('categories');
        console.log('Categories table dropped successfully');
    } catch (error) {
        console.error('Error dropping categories table:', error.message);
    }
};
