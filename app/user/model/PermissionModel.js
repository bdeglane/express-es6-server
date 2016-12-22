import {bookshelf} from '../../../config/config-orm';
import {RoleModel} from './RoleModel';

const tableName = 'permission';

export const PermissionModel = bookshelf.Model.extend({
  tableName: tableName,
  role: function () {
    return this.belongsToMany(RoleModel);
  }
});

export const permissionSchema = (knex) => {
  return knex.schema
    .createTable(tableName, (table) => {
      table.increments();
      table.string('name');
      table.string('permission');
    });
};