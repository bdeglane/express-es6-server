export const routing = [
  {
    verb: 'get',
    url: '/example',
    method: 'getExample'
  }, {
    verb: 'get',
    url: '/example/:id([0-9]+)',
    method: 'getExampleById'
  }
];
