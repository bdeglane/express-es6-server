'use strict';

import ServiceContainer from '../service/ServiceContainer';

export default class BaseController {
  constructor(resource) {
    this.resource = resource;
    this.service = ServiceContainer.getInstance();
  }

  /**
   *
   * @param r {string}
   */
  set resource(r) {
    if (typeof r === 'string') {
      this._resource = r;
    } else {
      throw new TypeError('resource must be a string');
    }
  }

  /**
   *
   * @returns {string}
   */
  get resource() {
    return this._resource;
  }

  // leave blank
}