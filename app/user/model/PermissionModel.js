import {bookshelf} from '../../../config/config-orm';

const tableName = 'permission';

export const PermissionModel = bookshelf.Model.extend({
  tableName: tableName
});

export const permissionSchema = (knex) => {
  return knex.schema
    .createTable(tableName, (table) => {
      table.increments();
      table.string('name');
      table.string('permission');
    });
};