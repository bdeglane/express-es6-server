import {schemas} from '../app/kernel';

for (let bundle in schemas) {
  schemas[bundle].seed();
}