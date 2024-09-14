import {
    GetObjectCommand,
    ListBucketsCommand,
    ListObjectsV2Command,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3'
import { GetCallerIdentityCommand, STSClient } from '@aws-sdk/client-sts'
import { ipcMain } from 'electron'
import { ACCESS_KEY, SECRET_KEY } from '../creds'

let s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_KEY,
    },
})

export const setCredentials = (
    _: Electron.IpcMainInvokeEvent,
    access_key: string,
    secret_key: string,
    region: string
) => {
    console.log('created new s3 client')
    s3.destroy()

    s3 = new S3Client({
        region: 'us-east-1',
        credentials: {
            accessKeyId: ACCESS_KEY,
            secretAccessKey: SECRET_KEY,
        },
    })

    return true
}

export const getBuckets = async () => {
    const getBuckets = new ListBucketsCommand()
    const result = await s3.send(getBuckets)
    return result.Buckets
}

export const getObjectsInsideABucket = async (
    _: Electron.IpcMainInvokeEvent,
    bucket: string
) => {
    const result = await s3.send(
        new ListObjectsV2Command({
            Bucket: bucket,
        })
    )
    return result.Contents.filter((c) => ({
        Key: c.Key,
        Size: c.Size,
        LastModified: c.LastModified,
    }))
}

export const getObjectContent = async (
    _: Electron.IpcMainInvokeEvent,
    type: string,
    key: string,
    bucket: string
) => {
    const allowed_types = [
        'text/plain',
        'application/json',
        'application/javascript',
        'text/html',
    ]

    if (!allowed_types.includes(type)) {
        return null
    }

    try {
        const result = await s3.send(
            new GetObjectCommand({
                Bucket: bucket,
                Key: key,
            })
        )

        const text_data = await result.Body.transformToString()

        return {
            value: text_data,
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

export const saveObjectContent = async (
    _: Electron.IpcMainInvokeEvent,
    key: string,
    value: string,
    bucket: string
) => {
    try {
        const result = await s3.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: key,
                Body: value,
            })
        )

        return result
    } catch (error) {
        console.error(error)
        return null
    }
}

export const getPresignedUrl = async (
    _: Electron.IpcMainInvokeEvent,
    key: string,
    bucket: string
) => {
    try {
        const result = await s3.send(
            new GetObjectCommand({
                Bucket: bucket,
                Key: key,
            })
        )

        return result.Body.transformToString('base64')
    } catch (error) {
        console.error(error)
        return null
    }
}

export const validateCredentials = async (
    _: Electron.IpcMainInvokeEvent,
    access_key: string,
    secret_key: string,
    region: string
) => {
    const sts_client = new STSClient({
        region: region,
        credentials: {
            accessKeyId: access_key,
            secretAccessKey: secret_key,
        },
    })

    try {
        await sts_client.send(new GetCallerIdentityCommand({}))
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

const changeS3Client = async (
    _: Electron.IpcMainInvokeEvent,
    access_key: string,
    secret_key: string,
    region: string
) => {
    s3.destroy()
    s3 = new S3Client({
        region,
        credentials: {
            accessKeyId: access_key,
            secretAccessKey: secret_key,
        },
    })

    return true
}

const startS3Handlers = async () => {
    ipcMain.handle('get-presigned-url', getPresignedUrl)
    ipcMain.handle('save-object-content', saveObjectContent)
    ipcMain.handle('get-object-content', getObjectContent)
    ipcMain.handle('get-buckets', getBuckets)
    ipcMain.handle('get-objects', getObjectsInsideABucket)
    ipcMain.handle('set-credentials', setCredentials)
    ipcMain.handle('validate-credentials', validateCredentials)
    ipcMain.handle('change-s3-account', changeS3Client)
}

export default startS3Handlers
