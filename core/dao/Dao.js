'use strict';

import {config} from '../../config/config';
import pg from 'pg';

const singleton = Symbol();
const singletonEnforcer = Symbol();

/**
 * singleton class Dao
 *
 * Specific dao used for postgre sql database
 *
 */
export default class Dao {
  /**
   *
   * @param enforcer {Symbol}
   */
  constructor(enforcer) {
    if (enforcer != singletonEnforcer) throw "class already exist! exit";
  }

  /**
   * Create instace if not exist and return it
   * @returns Dao
   */
  static getInstance() {
    if (!this[singleton]) {
      // on ajoute dans une propriété singleton de la classe Dao une instance de symbol.
      // cette propriété contient une instance unique de la class Dao
      this[singleton] = new Dao(singletonEnforcer);
      // a pool connection as an instance attribute
      this[singleton]['pool'] = new pg.Pool(Dao.getParams());
    }
    return this[singleton];
  }

  /**
   *
   * @returns {{user: string, database: string, password: string, port: number, max: number, idleTimeoutMillis: number}}
   */
  static getParams() {
    // if NODE_ENV is not defined
    // for test purpose
    if (typeof process.env.NODE_ENV == 'undefined') {
      return {
        user: 'test',
        database: 'test',
        password: 'test',
        port: 5432,
        // number of pool size connection
        max: 25,
        // max time for a request
        idleTimeoutMillis: 30000
      }
    } else {
      return {
        user: (
          typeof config[process.env.NODE_ENV].database.user !== 'undefined' ?
            config[process.env.NODE_ENV].database.user :
            'test'
        ),
        database: (
          typeof config[process.env.NODE_ENV].database.database !== 'undefined' ?
            config[process.env.NODE_ENV].database.database :
            'test'
        ),
        password: (
          typeof config[process.env.NODE_ENV].database.password !== 'undefined' ?
            config[process.env.NODE_ENV].database.password :
            'test'
        ),
        port: (
          typeof config[process.env.NODE_ENV].database.port !== 'undefined' ?
            config[process.env.NODE_ENV].database.port :
            5432
        ),
        // number of pool size connection
        max: 25,
        // max time for a request
        idleTimeoutMillis: 30000
      }
    }
  }

  /**
   *
   * the client always returning an array on success
   *
   * @param query {string}
   * @param params {array}
   * @returns {Promise}
   */
  connect({query, params}) {
    // return promise
    return new Promise((resolve, reject) => {
      // open a connection in a pool
      this.pool.connect(function (error, client, done) {
        // if pg can't open a connection
        if (error) {
          // console.log('error fetching client from pool', error);
          //reject(dao({code: 1, message: 'something wrong', error}));
        }
        //
        client.query(query, params, function (error, result) {
          //call `done()` to release the client back to the pool
          done();

          if (error) {
            // console.log('error running query', error);
            //reject(dao({code: 1, message: 'something wrong', error}));
          } else {
            resolve(result.rows);
          }
        });
      });
    });
  }
}