export const routing = [
  {
    verb: 'get',
    url: '/experiment/:id([0-9]+)',
    method: 'getById'
  }, {
    verb: 'post',
    url: '/experiment',
    method: 'post'
  }, {
    verb: 'put',
    url: '/experiment/:id([0-9]+)',
    method: 'update'
  }, {
    verb: 'delete',
    url: '/experiment/:id([0-9]+)',
    method: 'remove'
  }
];
