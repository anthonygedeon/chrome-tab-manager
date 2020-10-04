
/* eslint-disable */
export default class CollectionNavigator {
	/**
	 *
	 */
	constructor(lists) {
		this.lists = lists;
		this.index = -1;
		this.limit = null;
	}

	/**
	 * 
	 */
	set collectionIndex(value) {
		this.index = value;
	}

	/**
	 * 
	 */
	get currentCollectionItem() {

		if (this.index < 0) {
			throw new Error(`${this.index} is too low for collection. Please use the up and down methods to increase/decrease the index.`);
		}

		return collection[this.index];
	}

	/**
	 *
	 */
	up() {
		if (this.index > this.limit || this.index <= 0) {
			this.index = this.limit;
		}

		this.index -= 1;

		return this.index;
	}

	/**
	 *
	 */
	down() {
		if (this.index === this.limit - 1) {
			this.index = -1;
		}

		this.index += 1;

		return this.index;
	}

	/**
	 *
	 */
	get tabId() {

		this.limit = this.lists.length;

		return this.lists[Number(this.index)].id;
	}
}
