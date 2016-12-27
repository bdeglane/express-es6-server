import Database from '../core/database/Database';
import {schemas} from '../core/kernel';

let database = new Database(schemas);
database.recreateSchema();
