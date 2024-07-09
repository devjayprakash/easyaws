import { contextBridge, ipcRenderer } from 'electron';

const cache: { [e: string]: any } = {};

contextBridge.exposeInMainWorld('s3_api', {
  getPresignedUrl: async (key: string, bucket: string) => {
    if (cache[key]) {
      return cache[key];
    }

    const result = await ipcRenderer.invoke('get-presigned-url', key, bucket);
    cache[key] = result;

    return result;
  },
  saveObjectContent: async (key: string, value: string, bucket: string) => {
    try {
      console.log({ key, value, bucket });
      const result = await ipcRenderer.invoke(
        'save-object-content',
        key,
        value,
        bucket
      );

      cache[key] = {
        value,
      };

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getObjectContent: async (type: string, key: string, bucket: string) => {
    if (cache[key]) {
      return cache[key];
    }

    const value = await ipcRenderer.invoke(
      'get-object-content',
      type,
      key,
      bucket
    );
    cache[key] = value;

    return value;
  },
  getBuckets: async () => {
    return await ipcRenderer.invoke('get-buckets');
  },
  getBucketContents: async (bucket: string) => {
    if (cache[bucket]) {
      return cache[bucket];
    }

    const objects = await ipcRenderer.invoke('get-objects', bucket);
    cache[bucket] = objects;
    return objects;
  },
});
