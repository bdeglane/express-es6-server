import Controller from '../../Controller';
import ExampleDao from '../dao/ExampleDao';

export default class ExampleController extends Controller {
  constructor() {
    super('example');
    this.dao = new ExampleDao();
  }

  /**
   *
   * @param req
   * @param res
   * @returns {Promise<any|*|Object>}
   */
  async getExample(req, res) {
    let view = this.service.get('view');
    let models;
    try {
      models = await this.dao.getModels();
    } catch (e) {
      view.writeError(e);
      throw view.response;
    }
    view.write(models);
    return view.response;
  }

  /**
   *
   * @param req
   * @param res
   * @returns {Promise<any|*|Object>}
   */
  async getExampleById(req, res) {
    // get the view
    let view = this.service.get('view');
    // init variable
    let model;
    try {
      // try an async operation
      model = await this.dao.getModelById(1);
    } catch (e) {
      // write error in view
      view.writeError(e);
      // return a error view to the main controller
      throw view.response;
    }
    // return a view to the main controller
    view.write(model);
    return view.response;

  }
}