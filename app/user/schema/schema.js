'use strict';
import logger from 'winston';
import {userSchema} from '../model/UserModel';
import {roleSchema} from '../model/RoleModel';
import {sessionSchema} from '../model/SessionModel';
import {permissionSchema} from '../model/PermissionModel';
import {rolePermissionSchema} from '../model/rolePermission';

export const createSchema = (knex, callback) => {
  callback = callback || function () {
    };
  knex.schema
  // drop table user, role, session, permission if exist
    .dropTableIfExists('session')
    .dropTableIfExists('user')
    .dropTableIfExists('role_permission')
    .dropTableIfExists('permission')
    .dropTableIfExists('role')
    // then recreate it
    .then(() => roleSchema(knex))
    .then(() => userSchema(knex))
    .then(() => sessionSchema(knex))
    .then(() => permissionSchema(knex))
    .then(() => rolePermissionSchema(knex))
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