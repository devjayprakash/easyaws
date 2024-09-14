import { app } from 'electron'
import fs from 'fs/promises'
import path from 'path'

class JsonStorage {
    file_path: string
    json: { [key: string]: unknown }

    constructor(file_name: string) {
        console.log(app.getPath('userData'))

        this.file_path = path.join(app.getPath('userData'), file_name)
        this.init()
    }

    async init() {
        this.json = {}
        try {
            await fs.access(this.file_path)
            const file_content = await fs.readFile(this.file_path, 'utf-8')
            this.json = JSON.parse(file_content)
        } catch (error) {
            await fs.writeFile(this.file_path, '{}')
        }
    }

    async write() {
        try {
            fs.writeFile(this.file_path, JSON.stringify(this.json))
        } catch (error) {
            console.error(error)
        }
    }

    async setItem(key: string, value: unknown) {
        this.json[key] = value
        await this.write()
    }

    getItem(key: string) {
        return this.json[key]
    }

    async deleteItem(key: string) {
        delete this.json[key]
        await this.write()
    }
}

export default JsonStorage
