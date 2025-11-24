import { Storage } from '@google-cloud/storage';
import { IStorageService } from './storage.interface';
import { v4 as uuidv4 } from 'uuid';

export class GoogleCloudStorageService implements IStorageService {
  private storage: Storage;
  private bucketName: string;

  constructor() {
    this.storage = new Storage({
      keyFilename: process.env.GCS_KEYFILE,
    });
    this.bucketName = process.env.GCS_BUCKET_NAME || '';
  }

  async upload(file: Express.Multer.File): Promise<{ storagePath: string; publicUrl: string }> {
    const bucket = this.storage.bucket(this.bucketName);
    const storagePath = `${uuidv4()}-${file.originalname}`;
    const blob = bucket.file(storagePath);
    const blobStream = blob.createWriteStream();

    return new Promise((resolve, reject) => {
      blobStream.on('error', (err) => {
        reject(err);
      });

      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${storagePath}`;
        resolve({ storagePath, publicUrl });
      });

      blobStream.end(file.buffer);
    });
  }
}
