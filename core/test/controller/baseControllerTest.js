import chai from 'chai';
const assert = chai.assert;

import BaseController from '../../controller/BaseController';
import ServiceContainer from '../../service/ServiceContainer';

describe('BaseController', () => {
  describe('valid class', () => {
    const test = 'test';
    let bc = new BaseController(test);
    describe('constructor', () => {
      it('should not throw error', () => {
        assert.doesNotThrow(() => new BaseController(test), TypeError);
      });
      it('should have attribute _resource', () => {
        assert.equal(bc.resource, test);
      });
      it('should have an instance of service container', () => {
        assert.equal(bc.service, ServiceContainer.getInstance());
      });
    });
  });

  describe('invalid class', () => {
    const invT = [1, null, true, false, {}, [], () => {
    }];
    for (let ii in invT) {
      it(`should throw an error on ${typeof invT[ii]}`, () => {
        assert.throws(() => new BaseController(invT[ii]), TypeError);
      });
    }
  });
});