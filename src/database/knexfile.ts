import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

interface KnexConfig {
  [key: string]: object;
}

const defaults = {
  client: 'postgresql',
  connection: {
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DBNAME
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

const knexConfig: KnexConfig = {
  development: {
    ...defaults
  },

  production: {
    ...defaults
  }
};

export default knexConfig;
