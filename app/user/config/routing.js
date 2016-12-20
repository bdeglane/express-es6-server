export const routing = [
	{
		verb: 'get',
		url: '/user/:id([0-9]+)',
		method: 'getUserById'
	}, {
		verb: 'get',
		url: '/user/:id([0-9]+)/role',
		method: 'getUserRoleById'
	}
];
