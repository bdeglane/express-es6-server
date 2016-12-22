import UserController from './controller/UserController';
import {routing} from './config/routing';
import {createSchema} from './schema/schema';

export const user = {
  controller: UserController,
  routing,
  schema: {
    createSchema
  }
};