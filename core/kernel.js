/*
 * Import all available resources
 *
 *
 */
import {user} from '../app/user/user';
import {experiment} from '../app/experiment/experiment';
/*
 * Import all available services
 *
 * Services will be available in the service container.
 */
import Dao from './dao/Dao';
import View from './view/View';

export const resources = [
  user,
  experiment
];

export const services = {
  dao: Dao,
  view: View
};