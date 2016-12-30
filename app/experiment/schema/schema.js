'use strict';
import logger from 'winston';
import {experimentSchema} from '../model/ExperimentModel';

export const createSchema = (knex, callback) => {
  callback = callback || function () {
    };
  knex.schema
  // drop table user, role, session, permission if exist
    .dropTableIfExists('experiment')
    // then recreate it
    .then(() => experimentSchema(knex))
    .then(() => {
      logger.info('Database schema have been updated');
      callback();
      return null;
    })
    .catch((err) => {
      logger.error('Create schema error: %s', err.toString());
      callback(err);
    });
};