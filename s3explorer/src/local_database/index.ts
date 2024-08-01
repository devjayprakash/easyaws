// eslint-disable-next-line import/no-unresolved
import { app } from 'electron'
import { Low } from 'lowdb/lib'
// eslint-disable-next-line import/no-unresolved
import { JSONFilePreset } from 'lowdb/node'
import path from 'path'

type Theme = 'dark' | 'light'

export type JsonStoreData = {
    user_data: Partial<{
        id: string
        editor_theme: Theme
        app_theme: Theme
    }>
    aws_accounts: {
        id: string
        secret_key: string
        access_key: string
    }[]
}

const defaultData: JsonStoreData = {
    aws_accounts: [],
    user_data: {},
}

let db: Low<JsonStoreData> | undefined = undefined

export async function getDatabase() {
    if (db == undefined) {
        db = await JSONFilePreset<JsonStoreData>(
            path.join(app.getPath('userData'), 'data.json'),
            defaultData
        )
    }
    return db
}
