import { contextBridge, ipcRenderer } from 'electron';

const cache: { [e: string]: any } = {};

contextBridge.exposeInMainWorld('s3_api', {
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
