const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'renderer.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile(path.join(__dirname, 'index.html'));

    // Create the application menu
    const menu = Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {
                    label: 'About',
                    click: () => {
                        dialog.showMessageBox({
                            type: 'info',
                            title: 'About',
                            message: 'My Electron App\nVersion 1.0.0\n\nThis is a sample Electron application.',
                            buttons: ['OK']
                        });
                    }
                },
                { role: 'quit' }
            ]
        }
    ]);
    Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});