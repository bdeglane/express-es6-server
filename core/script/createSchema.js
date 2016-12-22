import Database from '../database/Database';
import {schemas} from '../kernel';

let database = new Database(schemas);
database.recreateSchema();
