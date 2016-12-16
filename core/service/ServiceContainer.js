'use strict';

const singleton = Symbol();
const singletonEnforcer = Symbol();

import BaseService from './BaseService';

export default class ServiceContainer {
  /**
   *
   * @param enforcer {Symbol}
   */
  constructor(enforcer) {
    if (enforcer != singletonEnforcer) throw new Error('class already exist! exit');
  }

  /**
   * Create instance if not exist and return it
   * @returns Dao
   */
  static getInstance() {
    if (!this[singleton]) {
      // on ajoute dans une propriété singleton de la classe Dao une instance de symbol.
      // cette propriété contient une instance unique de la class Dao
      this[singleton] = new ServiceContainer(singletonEnforcer);
      // a pool connection as an instance attribute
      this[singleton]['services'] = new Map();
    }
    return this[singleton];
  }

  /**
   *
   * @param service
   * @param object
   */
  add(service, object) {
    if (typeof service === 'string') {
      if (object instanceof BaseService) {
        if (!this.services.has(service)) {
          this.services.set(service, object);
        } else {
          throw new Error(`key '${service}' already exist`);
        }
      } else {
        throw new TypeError('object must be an instance of BaseService');
      }
    }
    else {
      throw new TypeError('service name must be a string');
    }
  }

  /**
   *
   * @param service
   */
  remove(service) {
    if (this.services.has(service)) {
      this.services.delete(service);
      return true;
    } else {
      return false;
    }
  }

  /**
   *
   * @param service
   */
  get(service) {
    if (typeof service === 'string') {
      if (this.services.has(service)) {
        return this.services.get(service);
      } else {
        return false;
      }
    }
    else {
      throw new TypeError('service name must be a string');
    }
  }
}