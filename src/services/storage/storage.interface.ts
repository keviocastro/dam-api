export interface IStorageService {
  upload(file: Express.Multer.File): Promise<{ storagePath: string; publicUrl: string }>;
  delete(storagePath: string): Promise<void>;
}
