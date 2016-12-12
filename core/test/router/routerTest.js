import chai from 'chai';
const assert = chai.assert;

import Router from '../../router/Router';
import Route from '../../router/Route';
import BaseController from '../../controller/BaseController';

describe('Router class', () => {
  // class helper
  class Resource extends BaseController {
    constructor() {
      super('test');
    }

    testMethod() {
    }
  }
  // params helper
  const params = {
    controller: Resource,
    routing: [{
      verb: 'GET',
      url: '/test-route',
      method: 'testMethod'
    }]
  };
  describe('valid Router', () => {
    describe('constructor', () => {
      it('should not throw error', () => {
        assert.doesNotThrow(() => new Router(params), TypeError);
      });
    });
    describe('routers attribute', () => {
      it('should contain a Route object', () => {
        let router = new Router(params);
        assert.instanceOf(router.routes[0], Route);
      });
    });
  });
  describe('valid Router', () => {
    describe('constructor', () => {
      it('should throw an error', () => {
        assert.throws(() => new Router(), TypeError);
      });
    });
    describe('invalid this.resource', () => {
      const invalidTypes = [1, 1.2, 'ab', true, false, Route, null, () => {
      }, {}, []];
      let router = new Router(params);
      for (let type in invalidTypes) {
        it(`should throw a TypeError on ${typeof invalidTypes[type]}`, () => {
          assert.throws(() => router.resource = invalidTypes[type], TypeError);
        })
      }
    });
    describe('invalid this.routing', () => {
      const invalidTypes = [1, 1.2, 'ab', true, false, Route, null, () => {
      }, {}];
      let router = new Router(params);
      for (let type in invalidTypes) {
        it(`should throw a TypeError on ${typeof invalidTypes[type]}`, () => {
          assert.throws(() => router.routing = invalidTypes[type], TypeError);
        })
      }
    });
    describe('invalid this.routes', () => {
      const invalidTypes = [1, 1.2, 'ab', true, false, Route, null, () => {
      }, {}, []];
      let router = new Router(params);
      for (let type in invalidTypes) {
        it(`should throw a TypeError on ${typeof invalidTypes[type]}`, () => {
          assert.throws(() => router.routes = invalidTypes[type], Error);
        })
      }
    });
  });
});