import jwt from 'jsonwebtoken';
import {config} from '../../../config/config';
import View from '../../../core/view/View';
import {UNAUTHORIZED} from '../../Controller';

export const authMiddleware = (req, res, next) => {
  // get the user token
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  // if the token exist in header
  if (token) {
    // verify if it's a valid token
    jwt.verify(token, config[process.env.NODE_ENV].app.token.secret, (err, decoded) => {
      // if the token is incorrect
      if (err) {
        // create the error response
        let view = new View()
          .writeError('Failed to authenticate token.')
          .setStatus(UNAUTHORIZED);
        // return an error
        return res.status(view.response.status).json(view.response);
      } else {
        // if everything is good, save to request for use in other routes
        // todo add role in token
        req.decoded = decoded;
        // console.log(req.decoded);
        next();
      }
    });
  } else {
    // create the error response
    let view = new View()
      .writeError('No token.')
      .setStatus(UNAUTHORIZED);
    return res.status(view.response.status).json(view.response);
  }
};

/**
 *
 * @param model
 */
export const getToken = (model) => {
  // delete model.role_id;
  // delete model.role.id;
  return jwt.sign(
    model, // the user data
    config[process.env.NODE_ENV].app.token.secret, // a key file
    {
      expiresIn: config[process.env.NODE_ENV].app.token.expire
    }
  );
};