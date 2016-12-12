'use strict';

const singleton = Symbol();
const singletonEnforcer = Symbol();

export default class ServiceContainer {
	/**
	 *
	 * @param enforcer {Symbol}
	 */
	constructor(enforcer) {
		if (enforcer != singletonEnforcer) throw "class already exist! exit";
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
			this[singleton]['services'] = {};
		}
		return this[singleton];
	}

	/**
	 *
	 * @param service
	 * @param object
	 */
	add(service, object) {
		//this.services[service] = this.services[service] || {};
		if (typeof object.getInstance === 'function') {
			this.services[service] = object.getInstance();
		} else {
			this.services[service] = new object();
		}
	}

	/**
	 *
	 * @param service
	 */
	remove(service) {
		if (this.services[service] !== 'undefined') {
			delete this.services[service];
		}
		return false;
	}

	/**
	 *
	 * @param service
	 */
	get(service) {
		if (this.services[service] !== 'undefined') {
			return this.services[service];
		}
		return false;
	}
}