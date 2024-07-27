import {
    GetObjectCommand,
    ListBucketsCommand,
    ListObjectsV2Command,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3'
import { ipcMain } from 'electron'

const s3 = new S3Client()

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

export const startS3DataBridge = async () => {
    ipcMain.handle('get-presigned-url', getPresignedUrl)
    ipcMain.handle('save-object-content', saveObjectContent)
    ipcMain.handle('get-object-content', getObjectContent)
    ipcMain.handle('get-buckets', getBuckets)
    ipcMain.handle('get-objects', getObjectsInsideABucket)
}
