const tabPageButton = document.querySelector('.button--tabby');

tabPageButton.addEventListener('click', () => {
    
    chrome.runtime.sendMessage({
        data: 'Handshake',
    }, (response) => {
        console.log(response)
    })

});

