import ModelError from '../core/error/BaseError'

export default class Model {
  constructor() {
    // this.error = ModelError;
  }

  /**
   *
   * @param model {object}
   */
  hydrate(model) {
    for (let key in model) {
      this.findSetter(key, model[key]);
    }
  }

  /**
   *
   * @param key
   * @param value
   */
  findSetter(key, value) {
    let setter = `set${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    if (typeof this[setter] === 'function') {
      this[setter](value);
    }
  }

  /**
   *
   * @param key
   * @param value
   */
  findGetter(key, value) {
    let getter = `get${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    if (typeof this[setter] === 'function') {
      this[setter](value);
    }
  }

  // leave blank
}