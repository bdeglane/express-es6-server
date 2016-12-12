'use strict';

export default class Controller {
  /**
   * Resource controller constructor
   * @param Resource {object}
   */
  constructor(Resource) {
    this.resource = new Resource()
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

    console.log(method);

    if (this.hasMethod(method)) {
      this.resource[method](req, res);
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
    return typeof this.resource[method] === 'function';
  }
}