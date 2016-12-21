import Model from '../../Model';
import check from 'check-types';

export default class PermissionModel extends Model {
  constructor({
    id = -1,
    name = '',
    permission = ''
  }) {
    super();
    this.hydrate({id, name, permission});
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

  /**
   *
   * @param permission {string}
   */
  setPermission(permission) {
    if (check.string(permission)) {
      this.permission = permission;
    } else {
      throw `wrong type`;
    }
  }

  /**
   *
   * @returns {string}
   */
  getPermission() {
    return this.permission;
  }
}