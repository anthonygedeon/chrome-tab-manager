import { TabManager } from './TabManager.js';
/* eslint-disable */
export default class TabNavigator {
	/**
	 *
	 */
	constructor() {
		this.lists = [];
		this.index = -1;
		this.limit = null;

		this.setTabs();
	}

	/**
	 *
	 */
	setTabs() {
		new TabManager().tabs((tabs) => {
			this.limit = tabs.length;

			for (const tab of tabs) {
				this.lists.push(tab);
			}
		});
	}

	set tabIndex(value) {
		this.index = value;
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
		return this.lists[Number(this.index)].id;
	}
}
