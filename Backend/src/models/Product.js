const { Model } = require('objection');
const knex = require('../database/connection');

Model.knex(knex);

class Product extends Model {
  static get tableName() {
    return 'products';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'price', 'quantity', 'category_id'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string' },
        price: { type: 'number', minimum: 0 },
        quantity: { type: 'integer', minimum: 0 },
        category_id: { type: 'integer' },
        image_url: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
    const Category = require('./Category');
    const OrderItem = require('./OrderItem');

    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'products.category_id',
          to: 'categories.id'
        }
      },
      orderItems: {
        relation: Model.HasManyRelation,
        modelClass: OrderItem,
        join: {
          from: 'products.id',
          to: 'order_items.product_id'
        }
      }
    };
  }
}

module.exports = Product;
