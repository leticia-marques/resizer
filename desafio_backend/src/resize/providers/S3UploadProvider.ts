import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { IUploadProvider } from './IUploadProvider';
import { resolve } from 'path';
import * as fs from 'fs';
import { HttpException } from '@nestjs/common';

class S3UploadProvider implements IUploadProvider {
  client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(file);
    const fileContent = await fs.promises.readFile(originalName);

    const fileName = file.split('/').pop();
    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket: `${process.env.NAME}`,
          Key: `${folder}/${fileName}`,
          Body: fileContent,
        }),
      );
    } catch (err) {
      throw new HttpException(
        {
          errors: [
            {
              code: 500,
              message: 'Error uploading file to s3',
            },
          ],
        },
        500,
      );
    }
    return file;
  }
}

export { S3UploadProvider };
