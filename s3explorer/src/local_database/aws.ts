import { randomUUID } from 'crypto'
import { getDatabase } from '.'

export async function addAwsAccount(secret_key: string, access_key: string) {
    const db = await getDatabase()
    db.data.aws_accounts.push({
        access_key,
        secret_key,
        id: randomUUID(),
    })
}

export async function deleteAwsAccount(id: string) {
    const db = await getDatabase()

    const ele = db.data.aws_accounts.findIndex((ele) => ele.id == id)

    if (ele == -1) {
        throw new Error('Cannot find the aws account with the given id')
    }

    db.data.aws_accounts.splice(ele, 1)
}
