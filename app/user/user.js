import UserController from './controller/UserController';
import {routing} from './config/routing';
import {createSchema} from './schema/schema';

export const user = {
  controller: UserController,
  routing
};

// export the knex schema for cli
export const userSchema = {
  createSchema
};