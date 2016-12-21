import Dao from '../../Dao';
import ExperimentModel from '../model/ExperimentModel';

export default class ExperimentDao extends Dao {
  constructor() {
    super();
    this.dumb = {
      data: {
        toto: 'tata'
      },
      config: {}
      // config: {hello: 'world'}
    };
  }

  async getModels() {
    let models = [];
    try {
      for (let ii = 0; ii < 4; ii++) {
        let model = await new ExperimentModel(this.dumb);
        models.push(model);
      }
    } catch (e) {
      throw e;
    }
    return models;
  }

  async getModel(id) {
    let dumb = Object.assign({}, this.dumb, {id: id});
    let model;
    try {
      // try an async operation
      model = await new ExperimentModel(dumb);
    } catch (e) {
      // throw the error e
      throw e;
    }
    // return a view to the main controller
    return model;
  }
}