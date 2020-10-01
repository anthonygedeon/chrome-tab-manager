/* eslint-disable */

import { TabManager } from './TabManager.js';
import TabNavigator from './Navigator.js';
import { clearButtonHtml, shortcutEscHtml, tabHtml } from './components.js';

const tabListContainer = document.querySelector('.tab-collection');

const browser = window.msBrowser || window.browser || window.chrome;

const manager = new TabManager();
const tabNavigator = new TabNavigator();

function closeWindow() {
	browser.windows.getAll({}, (windows) => {

		const popupId = windows.filter(window => window.type === 'popup')[0].id;

		browser.windows.remove(popupId);
	
	});
}

function generateTabList() {
	if (tabListContainer.hasChildNodes()) {
		Array.from(tabListContainer.childNodes).forEach((node) =>
			node.remove()
		);
	}

	manager.tabs((tabs) => {
		for (const tab of tabs) {
			console.log(tabs);

			const tabComponent = tabHtml(tab);

			tabListContainer.insertAdjacentHTML('beforeend', tabComponent);

			if (tab.favIconUrl === '') {
				const faviconContainer = document.querySelector(
					` [data-id="${tab.id}"] .tab__favicon-container`
				);

				faviconContainer
					.querySelector(` [data-id="${tab.id}"] .tab__favicon`)
					.remove();

				faviconContainer.classList.add('tab__favicon-container--base');
			}
		}
	});
}

function renderTabList() {
	generateTabList();
}

function enterHandler() {
	window.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			const id = tabNavigator.tabId;
			manager.goto(id);
			closeWindow();
		}
	});
}

function tabScrolling() {
	document
		.querySelectorAll('.tab')
		.forEach((tab) => tab.classList.remove('tab--active'));

	const selectedTab = document.querySelector(
		`[data-id="${tabNavigator.tabId}"]`
	);

	selectedTab.classList.add('tab--active');
}

document.querySelector('.tab-collection').addEventListener('click', (event) => {
	if (event.target.classList.contains('tab')) {
		const id = Number(event.target.dataset.id);

		manager.tabs((tabs) => {
			const indexOfTab = tabs.findIndex((tab) => tab.id === id);

			tabNavigator.tabIndex = indexOfTab;
		});

		manager.goto(id);

		closeWindow();

	}

	if (event.target.classList.contains('clear-icon')) {
		const removeId = Number(
			event.target.parentElement.parentElement.dataset.id
		);

		manager.closeTab(removeId);

		renderTabList();
	}
});



window.addEventListener('keydown', (event) => {
	switch (event.key) {
		case 'ArrowUp':
			tabNavigator.up();

			tabScrolling();

			enterHandler();
			break;

		case 'ArrowDown':
			tabNavigator.down();

			tabScrolling();

			enterHandler();
			break;

		default:
			break;
	}
});

window.addEventListener('DOMContentLoaded', () => {

	renderTabList();

	document.querySelector('.current-lookup__input').focus();

});

