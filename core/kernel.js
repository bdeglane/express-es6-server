/*
 * Import all available resources
 *
 *
 */
import {user} from '../app/user/user';
import {experiment} from '../app/experiment/experiment';
import {example} from '../app/example/example';
import {auth} from '../app/auth/auth';

// todo transform to private resources and give json web token callback checker
export const resources = [
  user,
  experiment,
  example,
  auth
];

// // todo add public and private resources
// export const publicResources = [
//   auth
// ];
// export const privateResources = [
//   user,
//   experiment,
//   example
// ];

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