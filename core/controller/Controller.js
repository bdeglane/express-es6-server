'use strict';

import BaseController from './BaseController';

// store resource controllers to avoid duplicate memory entry
let controllers = new Map();

export default class Controller {
  /**
   * Resource controller constructor
   * @param Resource {object}
   */
  constructor(Resource) {
    this.resourceName = '';
    this.resource = Resource;
    this.initControllerClass();
  }

  /**
   *
   * @param R {function}
   */
  set resource(R) {
    if (R.prototype instanceof BaseController) {
      this._resource = R;
    } else {
      throw new TypeError('resource must be inherit from BaseController');
    }
  }

  /**
   *
   * @returns {Function}
   */
  get resource() {
    return this._resource;
  }

  /**
   *
   * @param name {string}
   */
  set resourceName(name) {
    this._resourceName = name;
  }

  /**
   * @returns {string}
   */
  get resourceName() {
    return this._resourceName;
  }

  initControllerClass() {
    // instanciate the class controller
    let resource = new this.resource();
    // if key of current resource doesn't exist
    if (!controllers.has(resource.resource)) {
      // create one in map controllers
      controllers.set(resource.resource, resource);
    }
    // then save name of the resource controller
    this.resourceName = resource.resource;
  }

  /**
   *
   * @returns {object}
   */
  getController() {
    if (controllers.has(this.resourceName)) {
      return controllers.get(this.resourceName);
    }
  }

  /**
   *
   * @param req {object}
   * @param res {object}
   * @param next {object}
   * @param method {function}
   */
  call({req, res, next, method}) {
    this.method({req, res, next, method});
  }

  /**
   *
   * @param req {object}
   * @param res {object}
   * @param next {function}
   */
  middleware({req, res, next}) {
    next();
  }

  /**
   *
   * @param req {object}
   * @param res {object}
   * @param next {object}
   * @param method {function}
   */
  method({req, res, next, method}) {
    if (this.hasMethod(method)) {
      this.getController()[method](req, res);
    } else {
      // todo write error class as a service
      res.send('sad');
      throw `method ${method} doesn't exist`;
    }
  }

  /**
   *
   * @param method {string}
   * @returns {boolean}
   */
  hasMethod(method) {
    return typeof this.getController()[method] === 'function';
  }
}