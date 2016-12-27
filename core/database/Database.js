import {knex} from '../../config/config-orm';
import logger from 'winston';

export default class Database {
  constructor(schemas) {
    this.schemas = schemas;
  }

  shouldRecreateSchema() {
    if (typeof process.env.NODE_ENV !== 'undefined') {
      if (process.env.NODE_ENV == 'development') {
        return true;
      } else {
        logger.info(`can't run createSchema outside of NODE_ENV=development, actual env ${process.env.NODE_ENV}`);
        return false;
      }
    } else {
      logger.warn('NODE_ENV is undefined');
      process.exit(1);
      return false;
    }
  }

  recreateSchema() {
    if (this.shouldRecreateSchema()) {
      for (let schema in this.schemas) {
        this.schemas[schema].schema.createSchema(knex, function (err) {
          if (err) {
            logger.error('create database schema error: %s', err.toString());
          }
          knex.destroy();
        });
      }
    } else {
      process.exit(0);
    }
  }

  shouldUpdateSchema() {
    return process.env.NODE_ENV == 'production';
  }

  updateSchema() {
  }
}