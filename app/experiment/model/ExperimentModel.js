import Model from '../../Model'
import check from 'check-types';

export default class ExperimentModel extends Model {
  /**
   *
   * @param id {number}
   * @param title {string}
   * @param data {object}
   * @param config {object}
   */
  constructor({
    id = -1,
    title = '',
    data = {},
    config = {}
  }) {
    super();
    this.hydrate({id, title, data, config});
  }

  /**
   *
   * @param id {number}
   */
  setId(id) {
    if (check.integer(id)) {
      this.id = id;
    } else {
      throw `wrong type`;
    }
  }

  /**
   *
   * @returns {number}
   */
  getId() {
    return this.id;
  }

  /**
   *
   * @param title {string}
   */
  setTitle(title) {
    if (check.string(title)) {
      this.title = title;
    } else {
      throw `wrong type`;
    }
  }

  /**
   *
   * @returns {string}
   */
  getTitle() {
    return this.title;
  }

  /**
   *
   * @param data {Object}
   */
  setData(data) {
    if (check.object(data)) {
      this.data = data;
    } else {
      throw `wrong type`;
    }
  }

  /**
   *
   * @returns {Object}
   */
  getData() {
    return this.data;
  }

  /**
   *
   * @param config {Object}
   */
  setConfig(config) {
    if (check.object(config)) {
      this.config = config;
    } else {
      throw `wrong type`;
    }
  }

  /**
   *
   * @returns {Object}
   */
  getConfig() {
    return this.config;
  }
}