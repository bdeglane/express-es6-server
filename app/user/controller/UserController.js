'use strict';

import Controller from '../../Controller';
import {UserModel} from '../model/UserModel';

export default class UserController extends Controller {
  constructor() {
    super('user');
    this.model = UserModel;
  }

  /**
   *
   * @param req
   * @param res
   */
  async getUserById(req, res) {
    // get the view
    let View = this.service.get('view');
    let view = new View();
    // get the query param
    let id = parseInt(req.params.id);
    let model;
    try {
      model = await UserModel.where('id', id).fetch();
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

  /**
   *
   * @param req
   * @param res
   */
  getUserRoleById(req, res) {
  }
}