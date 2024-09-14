export default {
    async setItem(key: string, value: unknown) {
        await window.json_api.saveItemJson(key, value)
    },
    async getItem(key: string) {
        return await window.json_api.getItemJson(key)
    },
    async removeItem(key: string) {
        await window.json_api.deleteItemJson(key)
    },
}
