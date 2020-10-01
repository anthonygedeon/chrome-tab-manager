const browser = window.msBrowser || window.browser || window.chrome;
/* eslint-disable */
export class TabManager {
	/**
	 *
	 */
	constructor() {
		this.tabs = (callback) =>
			browser.tabs.query({}, (tabs) => callback(tabs));
	}

	/**
	 *
	 * @param {*} tabId
	 */
	closeTab(tabId) {
		browser.tabs.remove(tabId);
	}

	/**
	 *
	 * @param {*} tabId
	 */
	goto(tabId) {
		browser.tabs.update(tabId, { active: true });
	}

	getId() {}
}
