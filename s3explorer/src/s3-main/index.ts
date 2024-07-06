import {
  ListBucketsCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3';
import { ipcMain } from 'electron';

const s3 = new S3Client();

export const getObjectsInsideABucket = async () => {
  const getBuckets = new ListBucketsCommand();
  const result = await s3.send(getBuckets);
  return result.Buckets;
};

export const startS3DataBridge = async () => {
  ipcMain.handle('get-buckets', async () => {
    const result = await getObjectsInsideABucket();
    return result;
  });

  ipcMain.handle('get-objects', async (event, bucket: string) => {
    const result = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucket,
      })
    );
    return result.Contents.filter((c) => ({
      Key: c.Key,
      Size: c.Size,
      LastModified: c.LastModified,
    }));
  });
};