import { clearButtonHtml, shortcutEscHtml } from './components.js';

const inputTargetContainer = document.querySelector('.current-lookup__target');
const targetInput = document.querySelector('.current-lookup__input');
const tabsContainer = document.querySelector('.current-lookup__tabs');
const clearEscButton = document.querySelector('.current-lookup__clear');

const browser = window.msBrowser || window.browser || window.chrome;

class TabManager {

	constructor() {

		browser.tabs.query({}, (tabs) => {
			for (let tab of tabs) {

				this.tabs.push(tab);

			}
		});

		this.tabs = [];

	}

	closeTab(tabId) {
		return this.tabs.filter(tab => tab.id === tabId);
	}

}

const tabManager = new TabManager();


/**
 *
 */
function searchForTab() {}

function clearInputField(node) {
	return (node.value = '');
}

targetInput.addEventListener('keyup', (event) => {
	const clearButton = document.querySelector(
		'.current-lookup__clear-container'
	);

	if (inputTargetContainer.contains(clearButton)) {
		clearButton.addEventListener('click', () => {
			clearInputField(targetInput);
			clearEscButton.remove();
			clearButton.remove();
		});

		if (targetInput.value === '') {
			inputTargetContainer.removeChild(clearButton);
			clearButton.removeEventListener('click');
		}

		return;
	}

	inputTargetContainer.insertAdjacentHTML('beforeend', clearButtonHtml);
});
