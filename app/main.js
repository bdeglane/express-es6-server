import Server from '../core/server/Server';

import {config} from '../config/config';
import {publicResources, privateResources, middlewares, services, customErrorHandler} from './kernel';

let flamingo = new Server({
  config,
  publicResources,
  privateResources,
  middlewares,
  services,
  customErrorHandler
});
flamingo.init();
flamingo.start();