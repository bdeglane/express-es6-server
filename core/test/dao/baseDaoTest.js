import chai from 'chai';
const assert = chai.assert;

import BaseDao from '../../dao/BaseDao';
import Dao from '../../dao/Dao';

describe('BaseDao', () => {
  describe('valid class', () => {
    let bd = new BaseDao();
    describe('constructor', () => {
    });
    describe('attributes', () => {
      it('BaseDao class', () => {
        assert.instanceOf(bd.dao, Dao);
      });
    });
  });
});