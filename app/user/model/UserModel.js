import {bookshelf} from '../../../config/config-orm';

const tableName = 'user';

export const UserModel = bookshelf.Model.extend({
  tableName: tableName
});

export const userSchema = (knex) => {
  return knex.schema
    .createTable(tableName, (table) => {
      table.increments();
      table.string('name');
      table.string('login', 128);
      table.string('password');
      table.timestamps(null, true);
    });
};