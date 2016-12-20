import AuthController from './controller/AuthController';
import {routing} from './config/routing';
import {authMiddleware} from './middleware/auth';

export const auth = {
  controller: AuthController,
  routing
};

export const middleware = {
  auth: authMiddleware
};