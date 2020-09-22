const { app, BrowserWindow } = require('electron');

const createWindow = () => {
	const window = new BrowserWindow({
		width: 850,
		height: 650,
		webPreferences: {
			nodeIntegration: true,
		},
	});

    window.loadFile('dashboard.html');
    
    // window.webContents.openDevTools();
};

app.whenReady().then(createWindow);

