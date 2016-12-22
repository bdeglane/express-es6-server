import {knex} from '../../config/config-orm';
import logger from 'winston';

export default class Database {
  constructor(schemas) {
    this.schemas = schemas;
  }

  shouldRecreateSchema() {
    return process.env.NODE_ENV == 'development';
    // return false;
  }

  recreateSchema() {
    if (this.shouldRecreateSchema()) {
      for (let schema in this.schemas) {
        this.schemas[schema].createSchema(knex, function (err) {
          if (err) {
            logger.error('create database schema error: %s', err.toString());
          }
          knex.destroy();
        });
      }
    } else {
      logger.error('can\'t drop schema in ENV production');
    }
  }

  shouldUpdateSchema() {
    return process.env.NODE_ENV == 'production';
  }

  updateSchema() {
  }
}