'use strict';

import Route from './Route';

export default class Router {
  /**
   *
   * @param controller {string}
   * @param routing {array}
   */
  constructor({controller, routing}) {
    this.resource = controller;
    this.routes = [];
    this.build(routing, controller);
  }

  /**
   *
   * @param routes {array}
   * @param controller {object}
   */
  build(routes, controller) {
    for (let route in routes) {
      this.routes.push(new Route(routes[route], controller));
    }
  }

  /**
   *
   * @returns {Object}
   */
  getRessourceRouter() {
    return Route.getRouter();
  }
}