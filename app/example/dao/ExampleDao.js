import Dao from '../../Dao';
import ExampleModel from '../model/ExampleModel';

export default class ExampleDao extends Dao {
  constructor() {
    super();

    // dumb data
    this.dumb = {
      id: -1,
      name: 'example'
    };
  }

  async getModels() {
    let models = [];
    try {
      for (let ii = 0; ii < 4; ii++) {
        let model = await new ExampleModel(this.dumb);
        models.push(model);
      }
    } catch (e) {
      throw e;
    }
    return models;
  }

  /**
   *
   * @param id
   * @returns {Promise.<*>}
   */
  async getModelById(id) {
    let model;
    try {
      // try an async operation
      model = await new ExampleModel(this.dumb);
    } catch (e) {
      // throw the error e
      throw e;
    }
    // return a view to the main controller
    return model;
  }
}