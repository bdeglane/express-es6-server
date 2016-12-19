'use strict';

import BaseController from './BaseController';

// store resources controllers to avoid duplicate memory entry
let controllers = new Map();

/**
 * todo change to a macro controller
 */
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
    if (typeof name === 'string') {
      this._resourceName = name;
    } else {
      throw new TypeError('resource name must be a string');
    }
  }

  /**
   * @returns {string}
   */
  get resourceName() {
    return this._resourceName;
  }

  initControllerClass() {
    // instantiate the class controller
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
    return this.method({req, res, next, method});
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
      // promise fall back
      // 1. call the correct controller method
      return this.getController()[method](req, res)
      // 2. send the result
        .then((result) => {
          res.send(result);
        })
        // 3. send the error
        .catch((error) => {
          res.status(400).send(error);
        });
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