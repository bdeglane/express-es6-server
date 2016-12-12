import chai from 'chai';
const assert = chai.assert;

import Route from '../../router/Route';
import Controller from '../../controller/Controller';
import BaseController from '../../controller/BaseController';

describe('Route class', () => {
  describe('constructor', () => {
    describe('valid Route', () => {

      const params = {
        verb: 'GET',
        url: '/test-route',
        method: 'testMethod'
      };
      class Resource extends BaseController {
        constructor() {
          super('test');
        }

        testMethod() {
        }
      }

      it('should not throw error', () => {
        assert.doesNotThrow(() => new Route(params, Resource), TypeError);
      });
      describe('properties', () => {
        const route = new Route(params, Resource);
        it('should have valid property _verb', () => {
          assert.equal(route.verb, params.verb.toLowerCase());
        });
        it('should have valid property _url', () => {
          assert.equal(route.url, params.url);
        });
        it('should have valid property _method', () => {
          assert.equal(route.method, params.method);
        });
        it('should have valid property _resource, class extending BaseController', () => {
          assert.equal(route.resource, Resource);
        });
        it('should have valid property _controller instanceOf Controller', () => {
          assert.instanceOf(route.controller, Controller);
        });
      });
    });
  });

  describe('invalid Route', () => {
    const params = {
      verb: 'get',
      url: '/test-route',
      method: 'testMethod'
    };
    class Resource extends BaseController {
      constructor() {
        super('test');
      }

      testMethod() {
      }
    }
    let route = new Route(params, Resource);
    describe('invalid http verb', () => {
      describe('invalid type', () => {
        const invalidTypes = [1, 1.2, true, false, Resource, () => {
        }, {}, []];
        for (let type in invalidTypes) {
          it(`should throw a TypeError on ${typeof invalidTypes[type]}`, () => {
            assert.throws(() => route.verb = invalidTypes[type], TypeError);
          })
        }
      });
      describe('invalid type', () => {
        const invalidSyntax = ['a', 'b', 'toto', 'tata'];
        for (let type in invalidSyntax) {
          it(`should throw a TypeError on ${invalidSyntax[type]}`, () => {
            assert.throws(() => route.verb = invalidSyntax[type], SyntaxError);
          })
        }
      });
    });
    describe('invalid url', () => {
      const invalidTypes = [1, 1.2, true, false, Resource, () => {
      }, {}, []];
      for (let type in invalidTypes) {
        it(`should throw a TypeError on ${typeof invalidTypes[type]}`, () => {
          assert.throws(() => route.url = invalidTypes[type], TypeError);
        })
      }
    });
    describe('invalid method', () => {
      const invalidTypes = [1, 1.2, true, false, Resource, () => {
      }, {}, []];
      for (let type in invalidTypes) {
        it(`should throw a TypeError on ${typeof invalidTypes[type]}`, () => {
          assert.throws(() => route.method = invalidTypes[type], TypeError);
        })
      }
    });
    describe('invalid resource', () => {
      const invalidTypes = [1, 1.2, 'ab', true, false, Route, () => {
      }, {}, []];
      for (let type in invalidTypes) {
        it(`should throw a TypeError on ${typeof invalidTypes[type]}`, () => {
          assert.throws(() => new Route(params, invalidTypes[type]), TypeError);
        })
      }
    });
  });
});