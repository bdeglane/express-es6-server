export const routing = [
  {
    verb: 'get',
    url: '/experiment',
    method: 'getExperiment'
  }, {
    verb: 'get',
    url: '/experiment/:id([0-9]+)',
    method: 'getExperimentById'
  }
];
