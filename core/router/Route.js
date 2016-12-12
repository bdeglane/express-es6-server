'use strict';

import express from 'express';
import Controller from '../controller/Controller';
import BaseController from '../controller/BaseController';

let router = express.Router();

export default class Route {
  /**
   *
   * @param verb {string}
   * @param url {string}
   * @param method {string}
   * @param resource {object}
   */
  constructor({verb, url, method}, resource) {
    // save the params for the route
    this.verb = verb;
    this.url = url;
    this.method = method;
    this.resource = resource;
    // return a route for express
    this.buildController();
    this.createRoute();
  }

  /**
   * An http verb get, post, put, delete
   *
   * @param v {string} ['get','post','put','delete']
   */
  set verb(v) {
    if (typeof v === 'string') {
      this._verb = v.toLowerCase();
    } else {
      throw new TypeError('verb must be a string');
    }
  }

  /**
   *
   * @returns {string}
   */
  get verb() {
    return this._verb;
  }

  /**
   * A route for express router '/route/id/:id'
   *
   * @param u {string}
   */
  set url(u) {
    if (typeof u === 'string') {
      this._url = u;
    } else {
      throw new TypeError('url must be a string');
    }
  }

  /**
   *
   * @returns {string}
   */
  get url() {
    return this._url;
  }

  /**
   * The method to call in the controller class
   * in this._ressource.
   *
   * @param m {string}
   */
  set method(m) {
    if (typeof m === 'string') {
      this._method = m;
    } else {
      throw new TypeError('method must be a string');
    }
  }

  /**
   *
   * @returns {string}
   */
  get method() {
    return this._method;
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
   * Instanciate the main Controller class
   */
  buildController() {
    this._controller = new Controller(this.resource);
  }

  /**
   *
   * @returns {Controller}
   */
  get controller() {
    return this._controller;
  }

  /**
   * Add a route to the express.router class
   * ex: router.get('/test/id',(req,res,next)=>{});
   */
  createRoute() {
    router[this.verb](this.url, (req, res, next) => {
      // first : call the middleware for a route
      this.callMiddleware(req, res, next);
    }, (req, res, next) => {
      // then call the controller
      this.callResource(req, res, next, this.method);
    });
  }

  /**
   *
   * @param req {object}
   * @param res {object}
   * @param next {object}
   */
  callMiddleware(req, res, next) {
    this.controller.middleware({req, res, next});
  }

  /**
   *
   * @param req {object}
   * @param res {object}
   * @param next {object}
   * @param method {string}
   */
  callResource(req, res, next, method) {
    this.controller.call({req, res, next, method});
  }

  /**
   *
   * @returns {object}
   */
  static getRouter() {
    return router;
  }
}