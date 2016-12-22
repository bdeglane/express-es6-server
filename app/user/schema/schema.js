'use strict';
import logger from 'winston';

export const createSchema = (knex, callback) => {
  callback = callback || function () {
    };
  knex.schema
  // drop table user, role, session, permission if exist
    .dropTableIfExists('user')
    .dropTableIfExists('role')
    .dropTableIfExists('session')
    .dropTableIfExists('permission')
    // then recreate it
    .then(() => {
      return knex.schema
        .createTable('user', (table) => {
          table.increments();
          table.string('name');
          table.string('login', 128);
          table.string('password');
          table.timestamps();
        });
    })
    .then(() => {
      return knex.schema
        .createTable('role', (table) => {
          table.increments();
          table.string('name');
        });
    })
    .then(() => {
      return knex.schema
        .createTable('session', (table) => {
          table.increments();
          table.string('name');
          table.timestamp('created_at').defaultTo(knex.fn.now());
        });
    })
    .then(() => {
      return knex.schema
        .createTable('permission', (table) => {
          table.increments();
          table.string('name');
          table.string('permission');
        });
    })
    .then(() => {
      logger.info('Database schema have been updated');
      callback();
    })
    .catch((err) => {
      logger.error('Create schema error: %s', err.toString());
      callback(err);
    });
};