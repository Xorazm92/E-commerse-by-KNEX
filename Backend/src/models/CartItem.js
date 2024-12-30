const { Model } = require('objection');
const knex = require('../database/connection');

Model.knex(knex);

class CartItem extends Model {
  static get tableName() {
    return 'cart_items';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['cart_id', 'product_id', 'quantity'],
      properties: {
        id: { type: 'integer' },
        cart_id: { type: 'integer' },
        product_id: { type: 'integer' },
        quantity: { type: 'integer', minimum: 1 },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
    const Cart = require('./Cart');
    const Product = require('./Product');

    return {
      cart: {
        relation: Model.BelongsToOneRelation,
        modelClass: Cart,
        join: {
          from: 'cart_items.cart_id',
          to: 'carts.id'
        }
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: 'cart_items.product_id',
          to: 'products.id'
        }
      }
    };
  }
}

module.exports = CartItem;
