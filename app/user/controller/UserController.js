'use strict';

import Controller from '../../Controller';
import UserModel from '../model/UserModel';

export default class UserController extends Controller {
  constructor() {
    super('user');
  }

  /**
   *
   * @param req
   * @param res
   */
  getUserById(req, res) {
    let view = this.service.get('view');
    view.write(new UserModel(0, 'test', 22));

    console.log(view);
    res.send(view);
  }

  /**
   *
   * @param req
   * @param res
   */
  getUserRoleById(req, res) {
  }
}