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
    if (enforcer != singletonEnforcer) throw new Error('class already exist! exit');
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
    }
    return this[singleton];
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
  }
}