import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('s3_api', {
  getBuckets: async () => {
    return await ipcRenderer.invoke('get-buckets');
  },
  getBucketContents: async (bucket: string) => {
    return await ipcRenderer.invoke('get-objects', bucket);
  },
});
