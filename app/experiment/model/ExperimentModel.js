import {bookshelf} from '../../../config/config-orm';
import {UserModel} from '../../user/model/UserModel';
const tableName = 'experiment';

export const ExperimentModel = bookshelf.Model.extend({
  tableName: tableName,
  user: function () {
    return this.belongsTo(UserModel);
  }
});

export const experimentSchema = (knex) => {
  return knex.schema
    .createTable(tableName, (table) => {
      table.increments();
      table.string('name');
      table.string('description');
      table.string('coordinates');
      table.integer('user_id').references('user.id');
      table.timestamps(true, true);
    });
};