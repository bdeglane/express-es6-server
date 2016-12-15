'use strict';

import Route from './Route';
import BaseController from '../controller/BaseController';

export default class Router {
  /**
   *
   * @param controller {function}
   * @param routing {array}
   */
  constructor({controller, routing}) {
    this.resource = controller;
    this.routing = routing;
    this._routes = [];
    // build a Route class for each
    // literal object in routing
    this.build();
  }

  /**
   * A class extending BaseControlleur
   *
   * @param r {function}
   */
  set resource(r) {
    if (r.prototype instanceof BaseController) {
      this._resource = r;
    } else {
      throw new TypeError('resource must be inherit from BaseController');
    }
  }

  /**
   *
   * @returns {function}
   */
  get resource() {
    return this._resource;
  }

  /**
   *
   * @param r {object}
   */
  set routing(r) {
    if (Array.isArray(r)) {
      this._routing = r;
    } else {
      throw new TypeError('resource must be an array');
    }
  }

  /**
   *
   * @returns {object}
   */
  get routing() {
    return this._routing;
  }

  /**
   *
   * @param r {Array}
   */
  set routes(r) {
    throw new Error('this.routes is a private attribute');
  }

  /**
   *
   * @returns {Array}
   */
  get routes() {
    return this._routes;
  }

  /**
   * push in this.routes array an instance of
   * Route for each route in this.routing
   **/
  build() {
    for (let route in this.routing) {
      this.routes.push(new Route(this.routing[route], this.resource));
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