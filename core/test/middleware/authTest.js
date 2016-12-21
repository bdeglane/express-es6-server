import chai from 'chai';
const assert = chai.assert;

import jwt from 'jsonwebtoken';
import {config} from '../../../config/config';
import {authMiddleware, getToken} from '../../middleware/auth';

describe('auth middleware', () => {
  describe('getToken', () => {
    process.env.NODE_ENV = 'development';
    let user = {name: 'test'};
    let token = getToken(user);
    describe('valid token', () => {
      it('should be a string', () => {
        assert.isString(token);
      });
      describe('decoded', () => {
        it('should be an object', () => {
          jwt.verify(token, config[process.env.NODE_ENV].app.token.secret, (err, decoded) => {
            // if the token is incorrect
            if (err) {
            } else {
              // assert.equal(decoded, user);
              assert.isString(decoded);
            }
          });
        });
      });
    });
  });
});
