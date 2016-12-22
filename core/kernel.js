/*
 * Import all available resources
 *
 *
 */
import {user} from '../app/user/user';
import {experiment} from '../app/experiment/experiment';
import {example} from '../app/example/example';
import {auth, middleware} from '../app/auth/auth';

export const publicResources = [
  auth
];
export const privateResources = [
  user,
  experiment,
  example
];

// give to kernel a middleware to protect private route
// this callback is managed in the auth package
export const middlewares = {
  private: middleware.auth
};

/*
 * Import all available services
 *
 * Services will be available in the service container.
 */
import Dao from './dao/Dao';
import View from './view/View';
// import

export const services = {
  dao: Dao.getInstance(),
  view: View
};

import {NOT_FOUND, INTERNAL_ERROR} from '../app/Controller';

// deal with 404 and 500
export const customErrorHandler = {
  notFound: (req, res) => {
    let view = new View();
    view.writeError('not found').setStatus(NOT_FOUND);
    res.status(view.response.status).json(view.response);
  },
  internalServerError: (err, req, res, next) => {
    // todo log error
    console.error(err.stack);
    let view = new View();
    view.writeError('Something broke!').setStatus(INTERNAL_ERROR);
    res.status(view.response.status).json(view.response);
  }
};

import {schema} from '../app/user/user';

export const schemas = {
  user: schema
};