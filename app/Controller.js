'use strict';

import BaseController from '../core/controller/BaseController';

export default class Controller extends BaseController {
  constructor(resource) {
    super(resource);

    this.code = {
      SUCCESS,
      REDIRECT_TEMP,
      REDIRECT_PERM,
      BAD_REQUEST,
      UNAUTHORIZED,
      FORBIDDEN,
      NOT_FOUND,
      INTERNAL_ERROR,
      NOT_IMPLEMENTED,
      SERVICE_UNAVAILABLE
    }
  }

  /**
   *
   * @param query
   * @param view
   */
  async getHandler(query, view) {
    let model;
    try {
      model = await query;
    } catch (e) {
      // write error in view
      view
        .writeError(e)
        .setStatus(this.code.BAD_REQUEST);
      // return a error view to the main controller
      throw view.response;
    }
    if (model != null) {
      view
        .write(model)
        .setStatus(this.code.SUCCESS);
      return view.response;
    } else {
      view
        .write({})
        .setStatus(this.code.NOT_FOUND);
      return view.response;
    }
  }

  // leave blank
}

export const SUCCESS = 200;
export const REDIRECT_TEMP = 301;
export const REDIRECT_PERM = 302;
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const INTERNAL_ERROR = 500;
export const NOT_IMPLEMENTED = 501;
export const SERVICE_UNAVAILABLE = 503;