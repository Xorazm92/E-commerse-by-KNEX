const { Model } = require('objection');
const knex = require('../database/connection');

Model.knex(knex);

class Cart extends Model {
  static get tableName() {
    return 'carts';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id'],
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
    const User = require('./User');
    const CartItem = require('./CartItem');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'carts.user_id',
          to: 'users.id'
        }
      },
      cartItems: {
        relation: Model.HasManyRelation,
        modelClass: CartItem,
        join: {
          from: 'carts.id',
          to: 'cart_items.cart_id'
        }
      }
    };
  }
}

module.exports = Cart;
