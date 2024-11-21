import { logger } from '../utils/logger.js'
import { db } from '../database/index.js'

export const createProductsTable = async () => {
    try {
        await db.schema.createTableIfNotExists('products', (table) => {
            table.increments('id').primary()
            table
                .integer('category_id')
                .notNullable()
                .references('id')
                .inTable('categories')
                .onDelete('CASCADE')
            table.string('name').notNullable()
            table.decimal('price',10,2).notNullable()
            table.string('picture')
            table.string('summary').notNullable()
            table.text('description')
            table.enum('discount_type', ['trade', 'cash']) 
            table.decimal('discount_value', 10, 2) 
            table.string('tags')
            table.timestamp('create_at').defaultTo(db.fn.now())
            table.timestamp('update_at').defaultTo(db.fn.now())
        })

        logger.info('PRODUCTS table created successfully')
    } catch (error) {
        logger.error(error)
    } finally {
        await db.destroy()
    }
}
