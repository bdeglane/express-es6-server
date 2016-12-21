'use strict';

import Controller from '../../Controller';
import ExperimentDao from '../dao/ExperimentDao';

export default class ExperimentController extends Controller {
  constructor() {
    super('experiment');
    this.dao = new ExperimentDao();
  }

  async getExperiment(req, res) {
    // get the view
    let View = this.service.get('view');
    let view = new View();
    let models;
    try {
      models = await this.dao.getModels();
    } catch (e) {
      view
        .writeError(e)
        .setStatus(this.code.BAD_REQUEST);
      throw view.response;
    }

    view
      .write(models)
      .setStatus(this.code.SUCCESS);
    return view.response;
  }

  /**
   *
   * @param req
   * @param res
   */
  async getExperimentById(req, res) {
    // get the query param
    let id = parseInt(req.params.id);
    // get the view
    let View = this.service.get('view');
    let view = new View();
    // init variable
    let model;
    try {
      // try an async operation
      model = await this.dao.getModel(id);
    } catch (e) {
      // write error in view
      view
        .writeError(e)
        .setStatus(this.code.BAD_REQUEST);
      // return a error view to the main controller
      throw view.response;
    }
    // return a view to the main controller
    view
      .write(model)
      .setStatus(this.code.SUCCESS);
    return view.response;
  }
}