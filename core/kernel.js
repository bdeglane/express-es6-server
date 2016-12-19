/*
 * Import all available resources
 *
 *
 */
import {user} from '../app/user/user';
import {experiment} from '../app/experiment/experiment';
import {example} from '../app/example/example';

export const resources = [
  user,
  experiment,
  example
];

/*
 * Import all available services
 *
 * Services will be available in the service container.
 */
import Dao from './dao/Dao';
import View from './view/View';

export const services = {
  dao: Dao.getInstance(),
  view: new View()
};