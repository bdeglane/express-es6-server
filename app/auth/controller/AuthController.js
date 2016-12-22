'use strict';

import Controller from '../../Controller';
import {getToken} from '../middleware/auth';
import {UserModel} from '../../user/model/UserModel';


export default class AuthController extends Controller {
  constructor() {
    super('auth');
    this.userModel = UserModel;
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
      try {
        model = await this.userModel.where('login', login).fetch({withRelated: ['role']})
        // .then(function (book) {
        //   console.log(JSON.stringify(book.related('role')));
        // });
      } catch (e) {
        view
          .writeError('something wrong')
          .setStatus(this.code.SERVICE_UNAVAILABLE);
        return view.response;
      }

      console.log(model);

      // if is the correct password
      if (password === model.attributes.password) {
        // create a token
        let token = getToken(model.attributes);
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