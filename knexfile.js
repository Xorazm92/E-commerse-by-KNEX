// Update with your config settings.
import { config } from "./src/config/index.js";
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {

  development: {
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'postgres',
        database: 'knex',
        port:5432

    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
