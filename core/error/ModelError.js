import BaseError from './BaseError';

export default class ModelError extends BaseError {
  constructor(message) {
    super(message);
  }
}