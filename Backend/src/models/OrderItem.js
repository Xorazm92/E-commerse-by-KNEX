const { Model } = require('objection');
const knex = require('../database/connection');

Model.knex(knex);

class OrderItem extends Model {
  static get tableName() {
    return 'order_items';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['order_id', 'product_id', 'quantity', 'price'],
      properties: {
        id: { type: 'integer' },
        order_id: { type: 'integer' },
        product_id: { type: 'integer' },
        quantity: { type: 'integer', minimum: 1 },
        price: { type: 'number', minimum: 0 },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
    const Order = require('./Order');
    const Product = require('./Product');

    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: 'order_items.order_id',
          to: 'orders.id'
        }
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: 'order_items.product_id',
          to: 'products.id'
        }
      }
    };
  }
}

module.exports = OrderItem;
