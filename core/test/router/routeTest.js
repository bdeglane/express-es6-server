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
          assert.equal(route.verb, params.verb);
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
      verb: 1,
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
    it('should throw error', () => {
      assert.throws(() => new Route(params, Resource), TypeError);
    });
    // const route = new Route(params, Resource);
  });
});