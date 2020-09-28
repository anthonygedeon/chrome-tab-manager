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


	browser.tabs.query({}, (tabs) => {
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
	constructor(list) {
		this.list = list;
		this.index = 0;
		this.limit = list.length;
	}

	/**
	 * 
	 */
	up() {

		if (this.index > this.limit) {

			this.index = 0;

		}

		this.index += 1;

		return this.index;
	}

	/**
	 * 
	 */
	down() {

		if (this.index < this.limit) {

			this.index = this.limit;

		}

		this.index -= 1;

		return this.index;

	}

	/**
	 * 
	 */
	getId() {

		return this.list[this.index].id;

	}

}

const navigator = new Navigator(manager.tabs);

let currentTabCount = 1;

window.addEventListener('keydown', (event) => {

	if (event.key === 'ArrowDown') {

		console.log('Down', currentTabCount)

		document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('tab--active'));
		
		if (currentTabCount > manager.tabs.length) currentTabCount = 1;
		
		const selectedTab = document.querySelector(`.tab:nth-child(${currentTabCount})`); 

		selectedTab.classList.add('tab--active');

		currentTabCount++;

		window.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				const tabId = Number(selectedTab.dataset.id);	
				manager.goto(tabId);
			}
		});

	}

	if (event.key === 'ArrowUp') {

		if (currentTabCount === 0) currentTabCount = manager.tabs.length;

		document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('tab--active'));
		
		currentTabCount -= 1;
		
		console.log('Up', currentTabCount);

		const selectedTab = document.querySelector(`.tab:nth-child(${currentTabCount})`); 

		selectedTab.classList.add('tab--active');

		window.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				const tabId = Number(selectedTab.dataset.id);
	
				manager.goto(tabId);
			}
		});
	}

});