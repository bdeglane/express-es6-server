import {knex} from '../../config/config-orm';

export default class Database {
  constructor(schema) {
    this.schema = schema;

    this.recreateSchema();
  }

  shouldRecreateSchema() {
    return process.env.NODE_ENV == 'development';
  }

  recreateSchema() {
    if (this.shouldRecreateSchema()) {
      this.schema.recreateSchema(knex, function (err) {
        if (err) {
          logger.error('create database schema error: %s', err.toString());
        }
        knex.destroy();
      });
    }
  }

  shouldUpdateSchema() {
    return process.env.NODE_ENV == 'production';
  }

  updateSchema() {
  }
}