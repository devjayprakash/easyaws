import { contextBridge, ipcRenderer } from 'electron'
import {
    getBuckets,
    getObjectContent,
    getObjectsInsideABucket,
    getPresignedUrl,
    saveObjectContent,
} from './s3-main/index'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache: { [e: string]: any } = {}

const preload_scripts = {
    getPresignedUrl: async (key: string, bucket: string) => {
        if (cache[key]) {
            return cache[key]
        }

        const result = (await ipcRenderer.invoke(
            'get-presigned-url',
            key,
            bucket
        )) as ReturnType<typeof getPresignedUrl>
        cache[key] = result

        return result
    },
    saveObjectContent: async (key: string, value: string, bucket: string) => {
        try {
            console.log({ key, value, bucket })
            const result = (await ipcRenderer.invoke(
                'save-object-content',
                key,
                value,
                bucket
            )) as ReturnType<typeof saveObjectContent>

            cache[key] = {
                value,
            }

            return result
        } catch (error) {
            console.error(error)
            return null
        }
    },
    getObjectContent: async (type: string, key: string, bucket: string) => {
        if (cache[key]) {
            return cache[key]
        }

        const value = (await ipcRenderer.invoke(
            'get-object-content',
            type,
            key,
            bucket
        )) as ReturnType<typeof getObjectContent>
        cache[key] = value

        return value
    },
    getBuckets: async () => {
        return (await ipcRenderer.invoke('get-buckets')) as ReturnType<
            typeof getBuckets
        >
    },
    getBucketContents: async (bucket: string) => {
        if (cache[bucket]) {
            return cache[bucket]
        }

        const objects = (await ipcRenderer.invoke(
            'get-objects',
            bucket
        )) as ReturnType<typeof getObjectsInsideABucket>
        cache[bucket] = objects
        return objects
    },
}

export type PreloadScriptType = typeof preload_scripts

contextBridge.exposeInMainWorld('s3_api', preload_scripts)
