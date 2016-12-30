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

    return await this.getHandler(UserModel.where('id', id).fetch({withRelated: ['role']}), view);
  }
}