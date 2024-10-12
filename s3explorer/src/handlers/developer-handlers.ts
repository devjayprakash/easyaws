import { app, ipcMain } from 'electron'
import fs from 'fs/promises'
import path from 'path'

export const deleteUserData = async () => {
    const userDataLoc = app.getPath('userData')

    try {
        await fs.unlink(path.join(userDataLoc, 's3explorer.json'))
    } catch (error) {
        console.error('There was some issue during deleting the config file')

        console.error(error)
    }

    return true
}

const startDeveloperHandlers = () => {
    ipcMain.handle('delete-user-data', deleteUserData)
}

export default startDeveloperHandlers
