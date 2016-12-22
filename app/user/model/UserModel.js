import {bookshelf} from '../../../config/config-orm';
import {RoleModel} from './RoleModel';

const tableName = 'user';

export const UserModel = bookshelf.Model.extend({
  tableName: tableName,
  role: function () {
    return this.belongsTo(RoleModel);
  }
});

export const userSchema = (knex) => {
  return knex.schema
    .createTable(tableName, (table) => {
      table.increments();
      table.string('name');
      table.string('login', 128);
      table.string('password');
      table.integer('role_id').unique().references('role.id');
      table.timestamps(null, true);
    });
};