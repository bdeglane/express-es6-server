import chai from 'chai';
const assert = chai.assert;

import Dao from '../../dao/Dao';

describe('Dao singleton', () => {
  describe('valid class', () => {
    describe('constructor', () => {
      it('should throw error on new instance', () => {
        assert.throws(() => new Dao(), Error);
      });
      it('return the singleton instance on getInstance', () => {
        let dao = Dao.getInstance();
        assert.instanceOf(dao, Dao);
      });
      describe('method', () => {
        it('should connect to database', () => {
          let dao = Dao.getInstance();
          let query = 'SELECT now() as time';
          let cc = dao.connect({query});
        });
      });
    });
  });
});