import Database from '../core/database/Database';
import {schemas} from '../app/kernel';

let database = new Database(schemas);
database.recreateSchema();
