import knex from 'knex';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const knexfile = require(join(__dirname, '../../knexfile.cjs'));

const environment = process.env.NODE_ENV || 'development';
const config = knexfile[environment];

const db = knex(config);

export default db;
