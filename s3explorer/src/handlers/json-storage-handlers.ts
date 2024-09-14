import { ipcMain } from 'electron'
import JsonStorage from '../libs/JsonStorage'

const jsonStorage = new JsonStorage('s3explorer.json')

export const getItemJson = async (
    _: Electron.IpcMainInvokeEvent,
    key: string
) => {
    const data = jsonStorage.getItem(key)
    return data || null
}

export const saveItemJson = async (
    _: Electron.IpcMainInvokeEvent,
    key: string,
    value: unknown
) => {
    await jsonStorage.setItem(key, value)
    return true
}

export const deleteItemJson = async (
    _: Electron.IpcMainInvokeEvent,
    key: string
) => {
    await jsonStorage.deleteItem(key)
    return true
}

const startJsonHandler = () => {
    ipcMain.handle('get-item-json', getItemJson)
    ipcMain.handle('save-item-json', saveItemJson)
    ipcMain.handle('delete-item-json', deleteItemJson)
}

export default startJsonHandler
