let Knex = require('knex');
let Bookshelf = require('bookshelf');
let config = require('./config');

// if (typeof process.env.NODE_ENV == 'undefined') {
//   process.env.NODE_ENV = 'development';
// }

const dbConnection = {
  host: (
    typeof config[process.env.NODE_ENV].database.host !== 'undefined' ?
      config[process.env.NODE_ENV].database.host :
      '127.0.0.1'
  ),
  user: (
    typeof config[process.env.NODE_ENV].database.user !== 'undefined' ?
      config[process.env.NODE_ENV].database.user :
      'test'
  ),
  password: (
    typeof config[process.env.NODE_ENV].database.password !== 'undefined' ?
      config[process.env.NODE_ENV].database.password :
      'test'
  ),
  database: (
    typeof config[process.env.NODE_ENV].database.database !== 'undefined' ?
      config[process.env.NODE_ENV].database.database :
      'test'
  ),
  charset: 'utf8',
  pool: {
    min: 0,
    max: 7
  },
  acquireConnectionTimeout: 10000,
  debug: (process.env.NODE_ENV == 'development')
};

export const params = {
  // You need one of the following:
  // npm install pg
  // npm install mysql
  // npm install mariasql
  // npm install sqlite3
  client: 'pg',
  connection: dbConnection
};

export const knex = Knex(params);
export const bookshelf = Bookshelf(knex);

// module.exports = {
//   knex: knex,
//   bookshelf: bookshelf,
//   params: params
// };