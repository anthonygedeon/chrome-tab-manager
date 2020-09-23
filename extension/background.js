// Determines what browser the user is on.
const browser = window.msBrowser || window.browser || window.chrome;

const generateSearchApp = () => {
    const popupWidth = 850;
    const popupHeight = 650;

    // gets the full window dimension
    const { width } = window.screen;
    const { height } = window.screen;

    // Margings for centering popup
    const left = Math.round((width - popupWidth) / 2);
    const top = Math.round((height - popupHeight) / 2);

    browser.windows.create({
        url: '/extension/main.html',
        type: 'popup',
        width: popupWidth,
        height: popupHeight,
        left,
        top,
    });
};

chrome.runtime.onInstalled.addListener(() => {
    generateSearchApp();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // chrome.runtime.sendMessage({ data }, (response) => {

    sendResponse({ status: true });

    // })

    console.log(message.data);

    return true;
});
