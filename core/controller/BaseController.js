'use strict';

import ServiceContainer from '../service/ServiceContainer';

export default class BaseController {
  constructor(resource) {
    this.resource = resource;
    this.service = ServiceContainer.getInstance();
  }

  // leave blank
}