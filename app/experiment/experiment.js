import {routing} from './config/routing';
import ExperimentController from './controller/ExperimentController';
import {createSchema} from './schema/schema';

export const experiment = {
  controller: ExperimentController,
  routing
};

export const experimentSchema = {
  createSchema
};