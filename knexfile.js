// Update with your config settings.

const Dotenv = require('dotenv');
Dotenv.config({ path: `${__dirname}/.env`});
const { DB_NAME, DB_USER, DB_PASS, DB_HOST, PORT } = process.env

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: DB_NAME,
      user:     DB_USER,
      password: DB_PASS  
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
      tableName: 'knex_migrations',
      directory: './migrations'
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
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  }

};