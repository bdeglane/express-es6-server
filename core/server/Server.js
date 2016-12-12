'use strict';

import express from 'express';
import http from 'http';

import Router from '../router/Router';
import ServiceContainer from '../service/ServiceContainer';

import {config} from '../../config/config';
import {resources, services} from '../kernel';

export default class Server {
  constructor() {
    this.app = express();
    this.config = config;
    this.resources = resources;
    this.routers = [];
  }

  setUp() {
    process.env.PORT = this.config[process.env.NODE_ENV].app.port;
    this.createRouters();
    this.getRouters();
    this.buildServices();
  }

  /**
   * for each available resource in resources array in kernel.js file
   * a router will be built.
   */
  createRouters() {
    for (let resource in this.resources) {
      this.addRouter(this.resources[resource]);
    }
  }

  /**
   *
   * @param router
   */
  addRouter(router) {
    // console.log(router);
    this.routers.push(new Router(router));
  }

  /**
   *
   */
  getRouters() {
    for (let router in this.routers) {
      this.app.use(this.routers[router].getRessourceRouter());
    }
  }

  /**
   *
   */
  buildServices() {
    this.serviceContainer = ServiceContainer.getInstance();
    for (let service in services) {
      this.serviceContainer.add(service, services[service]);
    }
  }

  /**
   * to infinity and beyond
   * @returns {http.Server}
   */
  start() {
    return http
      .createServer(this.app)
      .listen(process.env.PORT, () => {
        console.info(`server started on localhost port: ${process.env.PORT}`);
      });
  }
}