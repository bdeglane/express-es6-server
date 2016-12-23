'use strict';

import Controller from '../../Controller';
import {getToken} from '../middleware/auth';
import {UserModel} from '../../user/model/UserModel';
import {SessionModel} from '../../user/model/SessionModel';

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
      let role;
      try {
        model = await UserModel.where('login', login).fetch({withRelated: ['role']});
        role = model.related('role');
      } catch (e) {
        view
          .writeError('something wrong')
          .setStatus(this.code.INTERNAL_ERROR);
        return view.response;
      }
      // if the login exist
      if (model != null) {
        // if is the correct password
        if (password === model.attributes.password) {
          // clean user
          let clean = Object.assign({}, model.attributes);
          delete clean.password;
          delete clean.role_id;
          delete clean.created_at;
          delete clean.updated_at;
          clean.role = role.attributes.name;
          // create a token
          let token = getToken(clean);
          // store session start
          try {
            await new SessionModel({user_id: model.attributes.id}).save().then((model) => {
            });
          } catch (e) {
            console.log(e);
          }
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