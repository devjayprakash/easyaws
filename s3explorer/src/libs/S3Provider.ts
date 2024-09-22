import { S3Client } from "@aws-sdk/client-s3";

class S3Provider {

    s3_client?: S3Client;

    constructor() {
        this.s3_client= undefined; 
    }

    getS3Client() {
        if (!this.s3_client) {
            throw new Error('No S3 client found');
        }
        return this.s3_client;
    }

    setS3Client(access_key: string, secret_key: string, region: string) {

        if (this.s3_client) {
            this.s3_client.destroy();
        }

        this.s3_client = new S3Client({
            region,
            credentials: {
                accessKeyId: access_key,
                secretAccessKey: secret_key,
            },
        });
    }
}

export default S3Provider