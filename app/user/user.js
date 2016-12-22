import UserController from './controller/UserController';
import {routing} from './config/routing';
import {recreateSchema} from './schema/schema';

export const user = {
  controller: UserController,
  routing,
  schema: {
    recreateSchema
  }
};