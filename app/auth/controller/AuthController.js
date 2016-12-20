'use strict';

import Controller from '../../Controller';
import UserDao from '../../user/dao/UserDao';

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
      let model;
      //
      try {
        // try to get a new model by the dao
        model = await this.dao.getUserByLogin(login);
      } catch (e) {
        // if error
        view.writeError(e)
          .setStatus(this.code.BAD_REQUEST);
        throw view.response;
      }
      // if is the correct password
      if (password === model.password) {
        // return a token
        view.write(model).setStatus(this.code.SUCCESS);
        return view.response;
      } else {
        view.writeError('wrong credentials')
          .setStatus(this.code.UNAUTHORIZED);
        return view.response;
      }
    } else {
      view.writeError('miss credentials')
        .setStatus(this.code.BAD_REQUEST);
      return view.response;
    }
  }
}