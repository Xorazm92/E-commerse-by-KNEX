const { Model } = require('objection');
const knex = require('../database/connection');

Model.knex(knex);

class Order extends Model {
  static get tableName() {
    return 'orders';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'status', 'total_amount'],
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        status: { 
          type: 'string', 
          enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] 
        },
        total_amount: { type: 'number', minimum: 0 },
        shipping_address: { type: 'string' },
        payment_status: { 
          type: 'string',
          enum: ['pending', 'paid', 'failed'] 
        },
        payment_method: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
    const User = require('./User');
    const OrderItem = require('./OrderItem');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'orders.user_id',
          to: 'users.id'
        }
      },
      orderItems: {
        relation: Model.HasManyRelation,
        modelClass: OrderItem,
        join: {
          from: 'orders.id',
          to: 'order_items.order_id'
        }
      }
    };
  }
}

module.exports = Order;
