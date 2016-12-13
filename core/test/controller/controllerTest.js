import chai from 'chai';
const assert = chai.assert;

import Controller from '../../controller/Controller';
import BaseController from '../../controller/BaseController';

describe('Controller class', () => {

  const stub = 'stub';
  class StubController extends BaseController {
    constructor() {
      super(stub)
    }

    stubMethod(req, res) {
      return {stub, req, res};
    }
  }
  describe('valid class', () => {
    describe('constructor', () => {
      it('should not throw error', () => {
        assert.doesNotThrow(() => new Controller(StubController), TypeError);
      });
      describe('attributes', () => {
        let controller = new Controller(StubController);
        it('should not throw error on attribute resource', () => {
          assert.doesNotThrow(() => controller.resource = StubController, TypeError);
        });
        it('should return StubController as resource attribute', () => {
          assert.equal(StubController, controller.resource);
        });
        it('should has method', () => {
          assert.equal(controller.hasMethod('stubMethod'), true);
        });
        it('should call stubMethod', () => {
          let req = {test: 'test'};
          let res = {test: 'test'};
          let next = () => {
            return {test: 'test'};
          };
          let method = 'stubMethod';
          assert.deepEqual(controller.call({req, res, next, method}), {stub, req, res});
          assert.deepEqual(controller.method({req, res, next, method}), {stub, req, res});
        });
      });
    });
  });
  describe('controllers', () => {
    it('sould have ony one key', () => {
      let controller = new Controller(StubController);
      let stub = new StubController();
      assert.equal(stub.prototype, controller.getController().prototype);
      assert.deepEqual(stub, controller.getController());
    });
  });
  describe('invalid class', () => {
    describe('getter and setter', () => {
      describe('resource', () => {
        let controller = new Controller(StubController);
        const invalidTypes = [1, 'a', true, false, null, () => {
        }, {}, []];
        for (let type in invalidTypes) {
          it(`should throw error on ${typeof invalidTypes[type]}`, () => {
            assert.throws(() => controller.resource = invalidTypes[type], TypeError);
          });
        }
      });
      describe('resourceName', () => {
        let controller = new Controller(StubController);
        const invalidTypes = [1, StubController, true, false, null, () => {
        }, {}, []];
        for (let type in invalidTypes) {
          it(`should throw error on ${typeof invalidTypes[type]}`, () => {
            assert.throws(() => controller.resourceName = invalidTypes[type], TypeError);
          });
        }
      });
    });
  });
})
;