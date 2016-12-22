'use strict';
import logger from 'winston';
import {userSchema} from '../model/UserModel';
import {roleSchema} from '../model/RoleModel';
import {sessionSchema} from '../model/SessionModel';
import {permissionSchema} from '../model/PermissionModel';

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
    .then(() => userSchema(knex))
    .then(() => roleSchema(knex))
    .then(() => sessionSchema(knex))
    .then(() => permissionSchema(knex))
    .then(() => {
      logger.info('Database schema have been updated');
      callback();
    })
    .catch((err) => {
      logger.error('Create schema error: %s', err.toString());
      callback(err);
    });
};