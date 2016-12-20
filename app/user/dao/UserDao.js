import Dao from '../../Dao';
import UserModel from '../model/UserModel';

export default class UserDao extends Dao {
  constructor() {
    super();
  }

  async getUserByLogin(login) {

    let model;
    try {
      model = new UserModel({
        id: 1,
        name: 'test',
        login: login,
        password: 'test'
      })
    } catch (e) {
      throw e;
    }
    return model;
  }
}