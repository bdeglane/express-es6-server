'use strict';

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import FileStreamRotator from 'file-stream-rotator';
import compression from 'compression';
import cors from 'cors';

import Router from '../router/Router';
import ServiceContainer from '../service/ServiceContainer';

import {config} from '../../config/config';
import {publicResources, privateResources, middlewares, services} from '../kernel';

export default class Server {
  constructor() {
    this.app = express();
    this.config = config;
    this.resources = {
      public: publicResources,
      private: privateResources
    };
    this.publicRouters = [];
    this.privateRouters = [];
  }

  setUp() {
    if (typeof process.env.NODE_ENV == 'undefined') {
      process.env.NODE_ENV = 'production';
    }
    process.env.PORT = this.config[process.env.NODE_ENV].app.port;
    this.buildMiddlewares();
    this.createRouters();
    this.getRouters();
    this.buildServices();
  }

  /**
   * for each available resource in resources array in kernel.js file
   * a router will be built.
   */
  createRouters() {
    for (let resource in this.resources.public) {
      this.addPublicRouter(this.resources.public[resource]);
    }
    for (let resource in this.resources.private) {
      this.addPrivateRouter(this.resources.private[resource]);
    }
  }

  addPublicRouter(router) {
    this.publicRouters.push(new Router(router));
  }

  addPrivateRouter(router) {
    this.privateRouters.push(new Router(router));
  }

  getPublicRouters() {
    for (let router in this.publicRouters) {
      this.app.use(this.publicRouters[router].getResourceRouter());
    }
  }

  getPrivateRouter() {
    for (let router in this.privateRouters) {
      let routes = this.privateRouters[router].getResourceRouter();
      routes.use(middlewares.private);
      this.app.use('/api/v1',routes);
    }
  }

  getRouters() {
    this.getPublicRouters();
    this.getPrivateRouter();
  }

  buildServices() {
    this.serviceContainer = ServiceContainer.getInstance();
    for (let service in services) {
      this.serviceContainer.add(service, services[service]);
    }
  }

  buildLogger() {
    this.app.enable("trust proxy");
    let logDirectory = path.resolve(path.join('log', 'access'));
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
    let accessLogStream = FileStreamRotator.getStream({
      date_format: 'YYYY-MM-DD',
      filename: logDirectory + '/api-access-%DATE%.log',
      frequency: 'weekly',
      verbose: false
    });
    this.app.use(morgan('[:date[clf]] [:req[x-forwarded-for]] [:req[x-forwarded-server]] :remote-user ":method :url"  :status :response-time ms :res[content-length] ":user-agent"', {stream: accessLogStream}));
  }

  buildMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(compression());
    this.app.use(cors());

    this.buildLogger();
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