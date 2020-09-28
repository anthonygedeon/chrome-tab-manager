import { TabManager } from './tab-manager.js';
import { clearButtonHtml, shortcutEscHtml, tabHtml } from './components.js';

const tabListContainer = document.querySelector('.tab-collection');

const browser = window.msBrowser || window.browser || window.chrome;

const manager = new TabManager();

function generateTabList() {
	if (tabListContainer.hasChildNodes()) {
		Array.from(tabListContainer.childNodes).forEach((node) =>
			node.remove()
		);
	}

	manager.tabs((tabs) => {
		for (let tab of tabs) {
			const tabComponent = tabHtml(tab);

			tabListContainer.insertAdjacentHTML('beforeend', tabComponent);
		}
	});
}

function renderTabList() {
	generateTabList();
}

document.querySelector('.tab-collection').addEventListener('click', (event) => {
	if (event.target.classList.contains('tab')) {
		const id = Number(event.target.dataset.id);

		manager.goto(id);

		renderTabList();
	}

	if (event.target.classList.contains('clear-icon')) {
		const removeId = Number(
			event.target.parentElement.parentElement.dataset.id
		);

		manager.closeTab(removeId);

		renderTabList();
	}
});

renderTabList();

class Navigator {
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
		manager.tabs((tabs) => {
			this.limit = tabs.length;

			for (let tab of tabs) {
				this.lists.push(tab);
			}
		});
	}

	/**
	 *
	 */
	up() {
		if (this.index > this.limit || this.index <= 0) {
			this.index = this.limit;
		}

		this.index -= 1;

		console.log('Up:', this.index, this.limit, this.lists);

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

		console.log('Down:', this.index, this.limit, this.lists);

		return this.index;
	}

	/**
	 *
	 */
	getId() {
		return this.lists[Number(this.index)].id;
	}
}

const navigator = new Navigator();

window.addEventListener('keydown', (event) => {
	if (event.key === 'ArrowUp') {
		navigator.up();

		document
			.querySelectorAll('.tab')
			.forEach((tab) => tab.classList.remove('tab--active'));

		const selectedTab = document.querySelector(
			`[data-id="${navigator.getId()}"]`
		);

		selectedTab.classList.add('tab--active');

		window.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				const tabId = Number(selectedTab.dataset.id);

				manager.goto(tabId);
			}
		});
	}

	if (event.key === 'ArrowDown') {
		navigator.down();

		document
			.querySelectorAll('.tab')
			.forEach((tab) => tab.classList.remove('tab--active'));

		const selectedTab = document.querySelector(
			`[data-id="${navigator.getId()}"]`
		);

		selectedTab.classList.add('tab--active');

		window.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				const tabId = Number(selectedTab.dataset.id);
				manager.goto(tabId);
			}
		});
	}
});
