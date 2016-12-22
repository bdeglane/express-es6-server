import {bookshelf} from '../../../config/config-orm';
import {UserModel} from './UserModel';

const tableName = 'role';

export const RoleModel = bookshelf.Model.extend({
  tableName: tableName,
  user: function () {
    return this.hasOne(UserModel);
  }
});

export const roleSchema = (knex) => {
  return knex.schema
    .createTable(tableName, (table) => {
      table.increments();
      table.string('name');
    });
};