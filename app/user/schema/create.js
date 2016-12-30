import Database from '../../../core/database/Database';
import {createSchema} from './schema';
import {userSeed} from './seed';

const schema = {
  user: {
    schema: {createSchema},
    seed: userSeed
  },
};

let database = new Database(schema);
database.recreateSchema();

// run to create tables
// node_modules\.bin\babel-node app\user\schema\create.js