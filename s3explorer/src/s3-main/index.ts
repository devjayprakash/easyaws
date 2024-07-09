import {
  GetObjectCommand,
  ListBucketsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ipcMain } from 'electron';
import { CLIENT_ID, CLIENT_SECRET } from '../temp';

const region = 'us-east-1';

const s3 = new S3Client();

export const getObjectsInsideABucket = async () => {
  const getBuckets = new ListBucketsCommand();
  const result = await s3.send(getBuckets);
  return result.Buckets;
};

export const startS3DataBridge = async () => {
  ipcMain.handle('get-presigned-url', async (_, key, bucket) => {
    try {
      const result = await s3.send(
        new GetObjectCommand({
          Bucket: bucket,
          Key: key,
        })
      );

      return result.Body.transformToString('base64');
    } catch (error) {
      console.error(error);
      return null;
    }
  });
  ipcMain.handle('save-object-content', async (_, key, value, bucket) => {
    try {
      const result = await s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: value,
        })
      );

      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  ipcMain.handle('get-object-content', async (_, type, key, bucket) => {
    const allowed_types = [
      'text/plain',
      'application/json',
      'application/javascript',
      'text/html',
    ];

    if (!allowed_types.includes(type)) {
      return null;
    }

    try {
      const result = await s3.send(
        new GetObjectCommand({
          Bucket: bucket,
          Key: key,
        })
      );

      const text_data = await result.Body.transformToString();

      return {
        value: text_data,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  });

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
