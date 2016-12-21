import Model from '../../Model';
import check from 'check-types';

export default class RoleModel extends Model {
  constructor({
    id = -1,
    name = ''
  }) {
    super();
    this.hydrate({id, name});
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
  setName(title) {
    if (check.string(title)) {
      this.name = title;
    } else {
      throw `wrong type`;
    }
  }

  /**
   *
   * @returns {string}
   */
  getName() {
    return this.name;
  }
}