/* eslint-disable */

import { KEY_NAME } from './util.js';
import { TabManager } from './TabManager.js';
import CollectionNavigator from './CollectionNavigator.js';
import {
	clearButtonHtml,
	shortcutEscHtml,
	tabHtml,
	windowHtml,
} from './components.js';


const browser = window.msBrowser || window.browser || window.chrome;

const manager = new TabManager();
const tabNavigator = new CollectionNavigator(getTabs());

function getTabs() {
	const allTabs = [];

	manager.tabs((tabs) => {
		for (let tab of tabs) {
			allTabs.push(tab);
		}
	});

	return allTabs;
}

function closePopup() {
	browser.windows.getAll({}, (windows) => {
		const popupId = windows.filter((window) => window.type === 'popup')[0]
			.id;

		browser.windows.remove(popupId);
	});
}

function generateWindowList() {
	const windowContainer = document.querySelector(
		'.window-collection__container'
	);

	if (windowContainer.hasChildNodes()) {
		Array.from(windowContainer.childNodes).forEach((node) => node.remove());
	}

	browser.windows.getAll({}, (windows) => {

		for (let window of windows) {
			if (window.type !== 'popup') {
				const windowComponent = windowHtml(window);

				windowContainer.insertAdjacentHTML(
					'beforeend',
					windowComponent
				);
			}
		}
	});
}

function generateTabList() {

	const tabListContainer = document.querySelector('.tab-collection');

	if (tabListContainer.hasChildNodes()) {
		Array.from(tabListContainer.childNodes).forEach((node) =>
			node.remove()
		);
	}

	manager.tabs((tabs) => {
		for (const tab of tabs) {
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
		document.querySelector('.current-lookup__tab-amount').textContent =
			tabs.length;
	});
}

function searchForTab() {
	const inputFieldText = document.querySelector('.current-lookup__input')
		.value;

	const regex = new RegExp(`${inputFieldText}`, 'g');

	manager.tabs((tabs) => {
		for (let tab of tabs) {
			tab.url = tab.url.replace(
				regex,
				(match) => `<strong>${match}</strong>`
			);
			console.log(tabHtml(tab));
		}
	});
}

function render() {

	generateWindowList();

	generateTabList();

}

function enterHandler() {
	window.addEventListener('keydown', (event) => {
		if (event.key === KEY_NAME.enter) {
			const tabId = tabNavigator.currentCollectionItem.id;
			manager.goto(tabId);
			closePopup();
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

window.addEventListener('keydown', (event) => {
	switch (event.key) {
		case KEY_NAME.arrowUp:
			tabNavigator.up();

			tabScrolling();

			enterHandler();
			break;

		case KEY_NAME.arrowDown:
			tabNavigator.down();

			tabScrolling();

			enterHandler();
			break;
	}
});

window.addEventListener('DOMContentLoaded', () => {
	render();

	document.querySelector('.current-lookup__input').focus();

	document.querySelector('.tab-collection').addEventListener('click', (event) => {
		if (event.target.classList.contains('tab')) {
			const id = Number(event.target.dataset.id);
	
			manager.tabs((tabs) => {
				const indexOfTab = tabs.findIndex((tab) => tab.id === id);
	
				tabNavigator.collectionIndex = indexOfTab;
			});
	
			manager.goto(id);
	
			closePopup();
		}
	
		if (event.target.classList.contains('clear-icon')) {
			const removeId = Number(
				event.target.parentElement.parentElement.dataset.id
			);
	
			manager.closeTab(removeId);
	
			render();
		}
	});
});

document
	.querySelector('.current-lookup__input')
	.addEventListener('keydown', (event) => {
		searchForTab();
	});
