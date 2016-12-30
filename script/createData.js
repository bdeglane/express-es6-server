import {schemas} from '../app/kernel';

for (let bundle in schemas) {
  if (typeof schemas[bundle].seed == 'function') {
    schemas[bundle].seed();
  }
}