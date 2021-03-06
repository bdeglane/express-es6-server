import chai from 'chai';
const assert = chai.assert;

import ServiceContainer from '../../service/ServiceContainer';
import BaseService from '../../service/BaseService';

describe('ServiceContainer', () => {
  describe('valid class', () => {
    describe('constructor', () => {
      it('should throw error on new instance', () => {
        assert.throws(() => new ServiceContainer(), Error);
      });
      it('should return the singleton instance', () => {
        assert.instanceOf(ServiceContainer.getInstance(), ServiceContainer);
      });
    });
    describe('method', () => {
      describe('add(service,object), get(service) and remove(service)', () => {
        it('should add a new service then delete it', () => {
          const test = 'test';
          class TestService extends BaseService {
            constructor() {
              super();
              this.test = test;
            }
          }
          let sc = ServiceContainer.getInstance();
          sc.add(test, new TestService());
          assert.instanceOf(sc.get(test), TestService);
          assert.equal(sc.remove(test), true);
        });
        it('should add a new singleton service the delete it', () => {
          const test = 'test2';
          class TestService2 extends BaseService {
            constructor() {
              super();
              this.test = test;
            }

            static getInstance() {
              return new TestService2();
            }
          }
          let sc = ServiceContainer.getInstance();
          sc.add(test, TestService2.getInstance());
          assert.instanceOf(sc.get(test), TestService2);
          assert.equal(sc.remove(test), true);
        });
        it('should return false on undefined service', () => {
          let sc = ServiceContainer.getInstance();
          assert.equal(sc.get('hello'), false);
        });
        it('should return an Error on already defined service', () => {
          let sc = ServiceContainer.getInstance();
          const test = 'test5';
          class TestService2 extends BaseService {
            constructor() {
              super();
              this.test = test;
            }

            static getInstance() {
              return new TestService2();
            }
          }
          sc.add('hello', new TestService2());
          assert.throws(() => sc.add('hello', new TestService2()), Error);
          assert.equal(sc.remove('hello'), true);
          assert.equal(sc.get('hello'), false);
        });
      });
      describe('remove(service)', () => {
        const test = 'test3';
        class TestService extends BaseService {
          constructor() {
            super();
            this.test = test;
          }
        }
        let sc = ServiceContainer.getInstance();
        sc.add(test, new TestService());
        it('should remove a service', () => {
          assert.equal(sc.remove(test), true);
        });
        it('should return false on remove undefined service', () => {
          assert.equal(sc.remove('world'), false);
        });
      });
    });
  });
  describe('invalid class', () => {
    describe('methods', () => {
      const test = 'test4';
      class TestService extends BaseService {
        constructor() {
          super();
          this.test = test;
        }
      }
      describe('add', () => {
        const isn = [1, true, false, null, {}, [], () => {
        }];
        let sc = ServiceContainer.getInstance();
        for (let ii in isn) {
          it(`should throw a TypeError on ${typeof isn[ii]}`, () => {
            assert.throws(() => sc.add(isn[ii], TestService), TypeError);
          });
        }
      });
      describe('get', () => {
        const isn = [1, true, false, null, {}, [], () => {
        }];
        let sc = ServiceContainer.getInstance();
        for (let ii in isn) {
          it(`should throw a TypeError on ${typeof isn[ii]}`, () => {
            assert.throws(() => sc.get(isn[ii]), TypeError);
          });
        }
      });
      describe('remove', () => {
      });
    });
  });
});
