import { Model } from 'objection';
import bcrypt from 'bcryptjs';
import knex from '../database/connection.js';

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
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
    return {
      profile: {
        relation: Model.HasOneRelation,
        modelClass: 'Profile',
        join: {
          from: 'users.id',
          to: 'profiles.user_id'
        }
      },
      orders: {
        relation: Model.HasManyRelation,
        modelClass: 'Order',
        join: {
          from: 'users.id',
          to: 'orders.user_id'
        }
      },
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: 'Review',
        join: {
          from: 'users.id',
          to: 'reviews.user_id'
        }
      }
    };
  }

  async $beforeInsert(context) {
    await super.$beforeInsert(context);
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  async $beforeUpdate(opt, context) {
    await super.$beforeUpdate(opt, context);
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  async verifyPassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }
}

export default User;
