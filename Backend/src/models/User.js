const { Model } = require('objection');
const bcrypt = require('bcryptjs');
const knex = require('../database/connection');

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password', 'role'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 },
        role: { type: 'string', enum: ['user', 'admin'] },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        phone: { type: 'string' },
        address: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
    const Order = require('./Order');
    const Cart = require('./Cart');

    return {
      orders: {
        relation: Model.HasManyRelation,
        modelClass: Order,
        join: {
          from: 'users.id',
          to: 'orders.user_id'
        }
      },
      cart: {
        relation: Model.HasOneRelation,
        modelClass: Cart,
        join: {
          from: 'users.id',
          to: 'carts.user_id'
        }
      }
    };
  }

  async $beforeInsert(context) {
    await super.$beforeInsert(context);
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async $beforeUpdate(opt, context) {
    await super.$beforeUpdate(opt, context);
    if (this.password && opt.patch) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async verifyPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

module.exports = User;
