import {bookshelf} from '../../../config/config-orm';
import {UserModel} from './UserModel';

const tableName = 'session';

export const SessionModel = bookshelf.Model.extend({
  tableName: tableName,
  user: function () {
    return this.belongsTo(UserModel);
  }
});

export const sessionSchema = (knex) => {
  return knex.schema
    .createTable(tableName, (table) => {
      table.increments();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.integer('user_id').unique().references('user.id');
    });
};