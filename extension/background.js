// Determines what browser the user is on.
const browser = window.msBrowser || window.browser || window.chrome;

/**
 * Creates the search popup
 */
function createSearchPopup() {
	const popupWidth = 850;
	const popupHeight = 650;

	// gets the full window dimension
	const { width } = window.screen;
	const { height } = window.screen;

	// Margins for centering popup
	const left = Math.round((width - popupWidth) / 2);
	const top = Math.round((height - popupHeight) / 2);

	browser.windows.create({
		url: '/extension/index.html',
		type: 'popup',
		width: popupWidth,
		height: popupHeight,
		left,
		top,
	});
}

browser.commands.onCommand.addListener((command) => {
	if (command === 'start_application') {
		createSearchPopup();
	}
});
