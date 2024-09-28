import { app, BrowserWindow } from 'electron'
import path from 'path'
import './handlers'

import update from 'update-electron-app'

update.updateElectronApp()

if (require('electron-squirrel-startup')) {
    app.quit()
}

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1080,
        height: 720,
        title : 'S3 Explorer',
        titleBarStyle: 'hiddenInset',
        frame: false,
        icon: '/src/images/icon.icns',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
    } else {
        mainWindow.loadFile(
            path.join(
                __dirname,
                `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`
            )
        )
    }

    // mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
