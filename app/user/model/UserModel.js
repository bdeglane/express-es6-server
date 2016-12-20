import Model from '../../Model';
import check from 'check-types';

export default class UserModel extends Model {
  constructor({
    id = -1,
    name = '',
    login = '',
    password = ''
  }) {
    super();
    this.hydrate({id, name, login, password});
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
   * @param login {string}
   */
  setLogin(login) {
    if (check.string(login)) {
      this.login = login;
    } else {
      throw `wrong type`;
    }
  }

  /**
   *
   * @returns {string}
   */
  getLogin() {
    return this.login;
  }

  /**
   *
   * @param password {string}
   */
  setPassword(password) {
    if (check.string(password)) {
      this.password = password;
    } else {
      throw `wrong type`;
    }
  }

  /**
   *
   * @returns {string}
   */
  getPassword() {
    return this.password;
  }
}