//endi yozorasizlar

import knex from "knex";
import { config } from "../config/index.js";
console.log(config.postgres);

export const db = knex({
    client: 'pg',
    connection: {
        host: config.postgres.host,
        user: config.postgres.user,
        password: config.postgres.password,
        database: config.postgres.database
    }
})