import { ipcRenderer } from 'electron'

const preload_json = {
    getItemJson: async (key: string) => {
        return ipcRenderer.invoke('get-item-json', key)
    },
    saveItemJson: async (key: string, value: unknown) => {
        return ipcRenderer.invoke('save-item-json', key, value)
    },
    deleteItemJson: async (key: string) => {
        return ipcRenderer.invoke('delete-item-json', key)
    },
}

export default preload_json
