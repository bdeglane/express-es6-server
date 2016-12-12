'use strict';

import Dao from './Dao';

export default class BaseDao {
	constructor() {
		this.dao = Dao.getInstance();
	}
}