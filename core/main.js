import Server from './server/Server';
// todo give all this to server as params
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
flamingo.setUp();
flamingo.start();