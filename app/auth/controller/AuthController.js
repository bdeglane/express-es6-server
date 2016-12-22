'use strict';

import Controller from '../../Controller';
import UserDao from '../../user/dao/UserDao';
import {getToken} from '../middleware/auth';

export default class AuthController extends Controller {
  constructor() {
    super('auth');
    this.dao = new UserDao();
  }

  /**
   *
   * @param req
   * @param res
   */
  async authUser(req, res) {
    // get the view
    let View = this.service.get('view');
    let view = new View();
    // get the body params
    let login = req.body.login;
    let password = req.body.password;
    // if credentials exist
    if (typeof login != 'undefined' && typeof password != 'undefined') {
      // init var model
      let model = {
        id: 1,
        login: 'test',
        password: 'test',
      };
      // if is the correct password
      if (password === model.password) {
        // create a token
        let token = getToken(model);
        // return a token
        view
          .write({token})
          .setStatus(this.code.SUCCESS);
        return view.response;
      } else {
        view
          .writeError('wrong credentials')
          .setStatus(this.code.UNAUTHORIZED);
        return view.response;
      }
    } else {
      view
        .writeError('miss credentials')
        .setStatus(this.code.BAD_REQUEST);
      return view.response;
    }
  }
}