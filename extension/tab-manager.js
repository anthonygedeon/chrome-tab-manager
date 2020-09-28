const browser = window.msBrowser || window.browser || window.chrome;

export class TabManager {

	constructor() {

		browser.tabs.query({}, (tabs) => {
			for (let tab of tabs) {

				this.tabs.push(tab);

			}
		});

		this.tabs = [];

	}

	closeTab(tabId) {

		browser.tabs.remove(tabId)

		return this.tabs.filter(tab => tab.id !== tabId);
	}

	goto(tabId) {
		browser.tabs.update(tabId, { active: true });
	}

}