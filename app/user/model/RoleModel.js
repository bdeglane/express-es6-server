import {bookshelf} from '../../../config/config-orm';

const tableName = 'role';

export const RoleModel = bookshelf.Model.extend({
  tableName: tableName
});

export const roleSchema = (knex) => {
  return knex.schema
    .createTable(tableName, (table) => {
      table.increments();
      table.string('name');
    });
};