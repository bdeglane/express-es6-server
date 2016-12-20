export default class View {
	constructor() {
		this.response = {
			data: [],
			status: -1,
			error: {status: false}
		};
	}

	/**
	 *
	 * @param data
	 * @returns {View}
	 */
	write(data) {
		this.response.data = data;
		return this;
	}

	/**
	 *
	 * @param error
	 * @returns {View}
	 */
	writeError(error) {
		this.response.error.message = error;
		this.response.error.status = true;
		return this;
	}

	/**
	 *
	 * @param status {number}
	 * @returns {View}
	 */
	setStatus(status) {
		this.response.status = status;
		return this;
	}
}