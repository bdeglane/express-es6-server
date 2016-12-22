import {bookshelf} from '../../../config/config-orm';
import {RoleModel} from './RoleModel';
import {SessionModel} from './SessionModel';

const tableName = 'user';

export const UserModel = bookshelf.Model.extend({
  tableName: tableName,
  role: function () {
    return this.belongsTo(RoleModel);
  },
  session: function () {
    return this.hasOne(SessionModel);
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
      table.timestamps(true, true);
    });
};