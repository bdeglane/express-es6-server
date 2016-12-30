import Database from '../../../core/database/Database';
import {createSchema} from './schema';

const Schema = {
  experiment: {
    schema: {createSchema}
  },
};

let database = new Database(Schema);
database.recreateSchema();

// run to create tables
// node_modules\.bin\babel-node app\experiment\schema\create.js