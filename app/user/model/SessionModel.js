import {bookshelf} from '../../../config/config-orm';

const tableName = 'session';

export const SessionModel = bookshelf.Model.extend({
  tableName: tableName
});

export const sessionSchema = (knex) => {
  return knex.schema
    .createTable(tableName, (table) => {
      table.increments();
      table.string('name');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};