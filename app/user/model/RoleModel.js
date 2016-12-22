import {bookshelf} from '../../../config/config-orm';
import {UserModel} from './UserModel';
import {PermissionModel} from './PermissionModel';

const tableName = 'role';

export const RoleModel = bookshelf.Model.extend({
  tableName: tableName,
  user: function () {
    return this.hasOne(UserModel);
  },
  permission: function () {
    return this.belongsToMany(PermissionModel);
  }
});

export const roleSchema = (knex) => {
  return knex.schema
    .createTable(tableName, (table) => {
      table.increments();
      table.string('name');
    });
};